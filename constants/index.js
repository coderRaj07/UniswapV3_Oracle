export const abi = [
	{
		"inputs": [
			{
				"internalType": "uint24",
				"name": "poolFee",
				"type": "uint24"
			},
			{
				"internalType": "address",
				"name": "tokenIn",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "tokenOut",
				"type": "address"
			},
			{
				"internalType": "uint128",
				"name": "amountIn",
				"type": "uint128"
			},
			{
				"internalType": "uint32",
				"name": "secondsAgo",
				"type": "uint32"
			}
		],
		"name": "estimateAmountOut",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "amountOut",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "factory",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]