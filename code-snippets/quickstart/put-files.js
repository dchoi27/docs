import process from 'process'
import minimist from 'minimist'
import { Web3Storage, getFilesFromPath } from 'web3.storage'

async function main () {
    const args = minimist(process.argv.slice(2))
    const token = args.token

    if (!token) {
        console.error('A token is needed. You can create one on https://web3.storage')
            return
    }

    if (args._.length < 1) {
      console.error('Please supply the path to a file or directory')
    }

    const storage = new Web3Storage({ token })

    for (const path of args._) {
      const files = await getFilesFromPath(path)
      console.log(`Uploading files from ${path}`)
      const cid = await storage.put(files)
      console.log('Content added with CID:', cid)
    }
}

main()
