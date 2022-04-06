import React from "react";
import "./style.css";

import { CubeIcon } from "@heroicons/react/outline";
import { FunctionComponent, useLayoutEffect, useRef, useState } from "react";
import {
  AppContext,
  Plugin,
  PluginSettings,
  Setting,
  TokenAccount,
  useCachedImage,
  useNFTAccounts,
  useTokenMetadata,
  ViewProps,
} from "saifu";
import LoadingComponent from "./components/loading";
import NoNftsComponent from "./components/nonfts";

interface NftBoxProps {
  app: AppContext;
  mint: string;
}

const NftBox: FunctionComponent<NftBoxProps> = (props: {
  app: AppContext;
  mint: string;
}) => {
  const [boxSize, setBoxSize] = React.useState(0);

  const metadata = useTokenMetadata(props.mint);
  const boxContainer = useRef(null);
  const nftImage = useCachedImage(metadata.data?.image);

  useLayoutEffect(() => {
    if (boxContainer.current) {
      setBoxSize((boxContainer.current as any).offsetWidth);
    }
  }, [boxContainer.current, metadata.isSuccess]);

  // not an NFT
  if (!metadata.isLoading && metadata.data === null) {
    return <></>;
  }

  const bgStyle = {
    backgroundImage: `url('${nftImage.data}')`,
    backgroundColor: "bg-gray-300",
    height: `${boxSize}px`,
  };

  return (
    <div ref={boxContainer} className="rounded-xl relative drop-shadow-md">
      {metadata.isLoading && (
        <div
          style={{ height: `${boxSize}px` }}
          className="bg-cover bg-no-repeat animate-pulse bg-gray-300"
        ></div>
      )}

      {!metadata.isLoading && (
        <div className="group ">
          <div
            style={bgStyle}
            className="bg-cover bg-no-repeat rounded-xl"
          ></div>

          <p className="absolute leading-loose rounded-r max-w-4/5 bg-white bottom-3 px-1 py-0.5 font-bold text-xs transition-all ease-in-out delay-75">
            {metadata.data?.name}
          </p>
        </div>
      )}
    </div>
  );
};

const NftOverviewView: FunctionComponent<ViewProps> = ({ app }) => {
  const nftAccs = useNFTAccounts();

  return (
    <>
      {(nftAccs.isLoading || nftAccs.isIdle) && <LoadingComponent />}
      {!nftAccs.isLoading && nftAccs.data?.length === 0 && <NoNftsComponent />}

      <div className="grid grid-cols-2 gap-3">
        {nftAccs.data
          ?.sort((a, b) => a.mint.localeCompare(b.mint))
          .map((acc: TokenAccount) => (
            <NftBox key={acc.mint} app={app} mint={acc.mint} />
          ))}
      </div>
    </>
  );
};
interface NFTPluginSettings {
  testString: string;
}

const DEFAULT_SETTINGS: NFTPluginSettings = {
  testString: "initial",
};

class NftOverviewSettings extends PluginSettings {
  plugin: NftOverviewPlugin;

  constructor(plugin: NftOverviewPlugin) {
    super(plugin);
    this.plugin = plugin;
  }

  display() {
    const setting = new Setting()
      .setName("Main Settings")
      .setDesc("Enter something here")
      .addText((text) => {
        return text
          .setPlaceholder("placeholder")
          .setValue(this.plugin.settings.testString)
          .onChange(async (val) => {
            this.plugin.settings.testString = val;
            await this.plugin.saveSettings();
          });
      });

    return [setting];
  }
}

export default class NftOverviewPlugin extends Plugin {
  settings: NFTPluginSettings = DEFAULT_SETTINGS;

  async onload(): Promise<void> {
    // await this.loadSettings();
    // this.setSettings(new NftOverviewSettings(this));

    this.addView({
      title: "NFTs",
      id: "overview",
      component: NftOverviewView,
      icon: <CubeIcon />,
    });
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
