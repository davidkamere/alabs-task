import cookie from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader('Set-Cookie', cookie.serialize('PCHA_COMMUNITY', req.body, {
        httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production',
    }))

    res.status(200).json({})
}