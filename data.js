import PEANUT_ABI_V3 from './data/peanutAbiV3.json';
import PEANUT_ABI_V4 from './data/peanutAbiV4.json';
import ERC20_ABI from './data/erc20abi.json';
import ERC721_ABI from './data/erc721abi.json';
import ERC1155_ABI from './data/erc1155abi.json';
import PEANUT_CONTRACTS from './data/contracts.json';
import PROVIDERS from './data/providers.json';
import CHAIN_MAP from './data/chainMap.json';
import CHAIN_DETAILS from './data/chainDetails.json';
import { version as VERSION } from './package.json'; // version from package.json

// CONSTANTS
const TOKEN_TYPES = Object.freeze({
	ETH: 0,
	ERC20: 1,
	ERC721: 2,
	ERC1155: 3,
});

const DEFAULT_CONTRACT_VERSION = 'v3';

// export all these functions (imported in index.js)
export {
	PEANUT_ABI_V3,
	PEANUT_ABI_V4,
	PEANUT_CONTRACTS,
	ERC20_ABI,
	ERC721_ABI,
	ERC1155_ABI,
	CHAIN_MAP,
	CHAIN_DETAILS,
	PROVIDERS,
	VERSION,
	TOKEN_TYPES,
	DEFAULT_CONTRACT_VERSION,
};