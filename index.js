const fs = require('hexo-fs');
const { deepMerge } = require('hexo-util');
const path = require('path');

// eslint-disable-next-line no-undef
hexo.extend.filter.register('after_init', async function () {
  const { base_dir, render } = this;

  const metaConfigPath = path.join(base_dir, 'meta-space-config.yml');
  const isExists = await fs.exists(metaConfigPath);
  if (!isExists) return;

  const metaConfig = await render.render({ path: metaConfigPath });
  const { user, site } = metaConfig;
  const hexoConfig = {};

  if (site && user) {
    hexoConfig.title = site.title;
    hexoConfig.subtitle = site.subtitle || '';
    hexoConfig.description = site.description || '';
    hexoConfig.author = site.author || user.nickname || user.username || '';
    hexoConfig.avatar =
      site.avatar ||
      'https://ipfs.fleek.co/ipfs/bafybeiccss3figrixd5qhhv6i6zhbz5chmyls6ja5kscu6drg7fnjcnxgm';
    hexoConfig.keywords = site.keywords || [];
    hexoConfig.language = site.language || 'en';
    hexoConfig.timezone = site.timezone || 'Asia/Shanghai';
    hexoConfig.url = `https://${site.domain}` || 'https://example.com';
  }

  this.config = deepMerge(this.config, hexoConfig);
});
