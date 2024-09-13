type ContractAddress = {
    [key: string]: string
  }

  const contracts: ContractAddress = {
    "0x1": "0x209AB2a2340EA3DaF049d3FF4617f7992B01a8D6",
    "0xa4b1": "0x2470275bF66Ac891a27179F19422ed71a3191514",
  }

export function getDisocuntContractAddress(id?: string){
    let address = contracts["0x1"];
    if(id && contracts[id])
      address = contracts[id];
    return address;
}