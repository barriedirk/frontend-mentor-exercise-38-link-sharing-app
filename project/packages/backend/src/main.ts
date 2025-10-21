import { createApp } from './createApp';
import { getJWTValues } from './utils/utils';

console.log('main.ts loaded');

try {
  const { PORT } = getJWTValues();
  const app = createApp();

  app.listen(PORT, () => {
    console.log(`✅ Server listening on http://localhost:${PORT}`);
  });
} catch (err) {
  console.error('❌ Server crashed during setup:', err);
}
