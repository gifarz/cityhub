const huggingFaceKey = process.env.HUGGING_FACE_KEY;
const huggingFaceUrl = process.env.HUGGING_FACE_URL;

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required.' });
        }

        try {
            // Call Hugging Face Inference API
            const response = await fetch(huggingFaceUrl, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${huggingFaceKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    inputs: prompt,
                    parameters: {
                        temperature: 0.5, // Adjust for randomness
                        top_p: 0.9,      // Nucleus sampling
                        max_length: 100, // Limit the response length
                        top_k: 50,       // Limit vocabulary for output
                    },
                }),
            });

            if (!response.ok) {
                throw new Error(`Hugging Face API error: ${response.statusText}`);
            }

            const data = await response.json();
            return res.status(200).json({ result: data });
        } catch (error) {
            console.error('Error generating text:', error);
            return res.status(500).json({ error: 'Internal server error.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
