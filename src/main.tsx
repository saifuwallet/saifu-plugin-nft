import { CubeIcon } from '@heroicons/react/outline';
import { Plugin } from 'saifu';

import NftOverviewView from './components/NFTOverview';
import './index.css';

interface NFTPluginSettings {
  testString: string;
}

const DEFAULT_SETTINGS: NFTPluginSettings = {
  testString: 'initial',
};

export default class NftOverviewPlugin extends Plugin {
  settings: NFTPluginSettings = DEFAULT_SETTINGS;

  async onload(): Promise<void> {
    // await this.loadSettings();
    // this.setSettings(new NftOverviewSettings(this));

    this.addView({
      title: 'NFTs',
      id: 'overview',
      component: NftOverviewView,
      icon: <CubeIcon />,
    });

    this.addTokenAction(
      ({ tokenInfo, tokenAccountInfo }) => {
        console.log(tokenAccountInfo);
        return (
          tokenInfo?.decimals === 1 ||
          tokenInfo?.decimals === 0 ||
          tokenAccountInfo?.decimals === 1 ||
          tokenAccountInfo?.decimals === 0
        );
      },
      'Open on MagicEden',
      ({ mint }) => {
        window.open(`https://magiceden.io/item-details/${mint}`);
      }
    );
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
