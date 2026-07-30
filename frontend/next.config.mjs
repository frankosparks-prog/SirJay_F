import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  outputFileTracingRoot: path.resolve(__dirname),
  allowedDevOrigins: ['192.168.1.225', 'localhost', '127.0.0.1'],
  output: 'export',
};

export default nextConfig;
