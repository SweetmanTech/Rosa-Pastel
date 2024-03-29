import { Box, Well, Paragraph, SpinnerOG } from '@zoralabs/zord'
import ERC721DropContractProvider from '@providers/ERC721DropProvider'
import { NextPage } from 'next'
import { SubgraphERC721Drop } from 'models/subgraph'
import { MintStatus } from '@components/MintStatus'
import { MintDetails } from '@components/MintDetails'
import SeoHead from '@components/SeoHead'
import { ipfsImage } from '@lib/helpers'

interface HomePageProps {
  collection: SubgraphERC721Drop
  chainId?: number
}

const HomePage: NextPage<HomePageProps> = ({ collection }) => {
  return (
    <>
      <SeoHead />
      <div
        className="font-body flex grid grid-cols-6 p-5 justify-center align-center "
        style={{ backgroundColor: 'black' }}
      >
        <div className="order-1 flex col-span-6 md:col-span-3 justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="lg:max-w-lg"
            src={ipfsImage(collection.editionMetadata.imageURI)}
            alt="cover image"
          />
        </div>
        <div className="order-2 flex flex-col justify-center text-md text-white md:text-2xl col-span-6 md:col-span-3 gap-5 pb-5">
          <div className="text-4xl font-bold">{process.env.NEXT_PUBLIC_TITLE}</div>
          <p className="pb-5">{collection.editionMetadata.description}</p>
        </div>
        <div className="order-3 col-span-3 flex justify-center items-center"></div>
        <div className="order-4 flex flex-col justify-start text-white text-md md:text-2xl col-span-3"></div>
        <div className="order-6 grid justify-items-center text-white	text-center lg:order-5 text-2xl col-span-6 lg:col-span-3">
          <div className="flex flex-col gap-3 text-left">
            <p className="font-bold text-center">
              {process.env.NEXT_PUBLIC_TITLE} - Alex Paul
            </p>
          </div>
        </div>
        <div className="my-5 order-5 lg:order-6 flex flex-col justify-start text-xs md:text-lg col-span-6 lg:col-span-3">
          <ERC721DropContractProvider
            erc721DropAddress={process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}
            chainId={parseInt(process.env.NEXT_PUBLIC_CHAIN_ID)}
          >
            <Well
              className="rounded-none border-black bg-white"
              p="x6"
              style={{ borderBottom: 0 }}
            >
              <audio controls src={ipfsImage(collection.editionMetadata.animationURI)}>
                Your browser does not support the
                <code>audio</code> element.
              </audio>
            </Well>
            <Well className="rounded-none border-black bg-white" p="x6">
              <Box>
                {collection != null ? (
                  <>
                    <MintDetails collection={collection} showPresale={false} />
                    <MintStatus collection={collection} />
                  </>
                ) : (
                  <Paragraph align="center" mt="x8">
                    <SpinnerOG />
                  </Paragraph>
                )}
              </Box>
            </Well>
          </ERC721DropContractProvider>
        </div>
      </div>
    </>
  )
}

export default HomePage
