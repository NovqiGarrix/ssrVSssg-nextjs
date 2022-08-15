import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== "POST") return res.status(406).send({ msg: "Method not allowed" });

    const urls = req.body.urls as Array<string>;
    if (!urls.length) return res.status(400).send({ msg: "Please send the urls that need to validate." });

    for (const url of urls) {
        await res.revalidate(url);
    }

    return res.status(200).send({ msg: "Successfully revalidated." });

}