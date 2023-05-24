import { NextPage } from "next";
import ContractBuilder from "../../../features/contract-builder/contractBuilder";
import { Cases } from "../../../features/contract-builder/cases";
import { useRouter } from "next/router";

const NFTTemplate: NextPage = () => {
  const router = useRouter();
  const { name } = router.query;

  return (
    <>
      <title>Hiro Builder: Build an NFT contract</title>
      <ContractBuilder
        templateCase={Cases.Nft}
        initialDataOverrides={name ? { general: { name } } : {}}
      />
    </>
  );
};

export default NFTTemplate;
