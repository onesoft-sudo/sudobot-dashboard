import { NextApiRequest, NextApiResponse } from "next";

export default async function Contact(req: NextApiRequest, res: NextApiResponse) {
    if (req.method!.toLowerCase() !== 'post') {
        return res.status(405).send({ error: 'Invalid request method' });
    }

    console.log(req.body);

    if (!req.body?.content) {
        return res.status(400).send({ error: 'Invalid request body' });
    }

    const { content } = req.body;
    const url = process.env.WEBHOOK!;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content })
        });

        console.log(response);
        res.status(200).send({ success: true });
    }
    catch (e) {
        return res.status(500).send({ error: 'Internal error' });
    }
}