import fs from 'fs'

export default function handler(req, res) {
    let bgFileNames = fs.readdirSync('./public/mp4/backgrounds')
    bgFileNames = bgFileNames.map(filename => `mp4/backgrounds/${filename}`)
    res.status(200).json({ backgrounds: bgFileNames })
}
  