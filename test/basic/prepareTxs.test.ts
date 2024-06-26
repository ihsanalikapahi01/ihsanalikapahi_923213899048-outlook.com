import peanut from '../../src/index' // import directly from source code
import { ethers } from 'ethersv5' // v5
import { expect, describe, it } from '@jest/globals'
import dotenv from 'dotenv'
import * as interfaces from '../../src/consts/interfaces.consts'
dotenv.config()

const TEST_WALLET_PRIVATE_KEY = process.env.TEST_WALLET_PRIVATE_KEY ?? ''
const GOERLI_RPC_URL = 'https://rpc.goerli.eth.gateway.fm'
const goerliProvider = new ethers.providers.JsonRpcProvider(GOERLI_RPC_URL)
const goerliWallet = new ethers.Wallet(TEST_WALLET_PRIVATE_KEY, goerliProvider)

describe('prepareDepositTxs', function () {
	it('should prepare transactions successfully', async function () {
		peanut.toggleVerbose()
		const response = await peanut.prepareDepositTxs({
			address: goerliWallet.address,
			linkDetails: {
				chainId: '137',
				tokenAmount: 0.01,
				tokenType: 0,
			},
			numberOfLinks: 1,
			passwords: ['testpassword'],
			provider: goerliProvider,
		})

		expect(response.unsignedTxs.length).toBeGreaterThan(0)
	})

	it('should prepare transactions successfully with erc20 token', async function () {
		const response = await peanut.prepareDepositTxs({
			address: goerliWallet.address,
			linkDetails: {
				chainId: '137',
				tokenAmount: 0.01,
				tokenType: 1,
				tokenAddress: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
				tokenDecimals: 6,
			},
			numberOfLinks: 1,
			passwords: ['testpassword'],
			provider: goerliProvider,
		})

		expect(response.unsignedTxs.length).toBeGreaterThan(0)
	})

	it('should fail when numberOfLinks is not equal to passwords.length', async function () {
		try {
			const response = await peanut.prepareDepositTxs({
				address: goerliWallet.address,
				linkDetails: {
					chainId: '137',
					tokenAmount: 0.01,
					tokenType: 0,
				},
				numberOfLinks: 2,
				passwords: ['testpassword'],
				provider: goerliProvider,
			})
		} catch (error) {
			expect(error.code).toBe(interfaces.EPrepareCreateTxsStatusCodes.ERROR_VALIDATING_LINK_DETAILS)
		}
	})

	it('should fail when linkDetails are not valid', async function () {
		try {
			const response = await peanut.prepareDepositTxs({
				address: goerliWallet.address,
				linkDetails: {
					chainId: '137',
					tokenAmount: -0.01, // Invalid token amount
					tokenType: 0,
				},
				numberOfLinks: 1,
				passwords: ['testpassword'],
				provider: goerliProvider,
			})
		} catch (error) {
			expect(error.code).toBe(interfaces.EPrepareCreateTxsStatusCodes.ERROR_VALIDATING_LINK_DETAILS)
		}
	})
})
