import { LensConfig, production } from '@lens-protocol/react-web';
import { bindings } from '@lens-protocol/wagmi';
import { wagmiConfig } from './provider/Walletprovider';

export const lensConfig: LensConfig = {
  environment: production,
  bindings: bindings(wagmiConfig),
};