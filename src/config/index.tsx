import { base } from '@reown/appkit/networks'
import type { AppKitNetwork } from '@reown/appkit/networks'
import { Ethers5Adapter } from '@reown/appkit-adapter-ethers5'

// Get projectId from https://cloud.reown.com
export const projectId = import.meta.env.VITE_PROJECT_ID || "21f3987b39c12f1a6f0b31db1db79f96" // this is a public projectId only to use on localhost

if (!projectId) {
  throw new Error('Project ID is not defined')
}

// Create a metadata object - optional
export const metadata = {
  name: 'Capital Frens',
  description: 'Capital Frens',
  url: 'https://capital-fre.netlify.app/', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

// for custom networks visit -> https://docs.reown.com/appkit/react/core/custom-networks
export const networks = [base] as [AppKitNetwork, ...AppKitNetwork[]]

// Set up Solana Adapter
export const ethers5Adapter = new Ethers5Adapter();