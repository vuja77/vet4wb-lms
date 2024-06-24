import withBundleAnalyzer from '@next/bundle-analyzer';

// Define your Next.js configuration object
const nextConfig = {

  compress: true,
};

// Create the bundle analyzer configuration
const bundleAnalyzerConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

// Export the merged configuration
export default {
  ...bundleAnalyzerConfig,
  ...nextConfig,
};
