type ContractAddress = {
    [key: string]: string
  }

export function getDisocuntContractAddress(id?: string){
      const contracts: ContractAddress = {
        "0x1": "0x209AB2a2340EA3DaF049d3FF4617f7992B01a8D6",
        "0xa4b1": "0x2470275bF66Ac891a27179F19422ed71a3191514",
        // "0xaa36a7": "0xe8eF3902B94d08f4d740FBBF368B4D1a4C5fD731" //sepolia testnet
      }
      return contracts[id || "0x1"];
}