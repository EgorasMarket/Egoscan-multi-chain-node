import { test as base, expect } from '@playwright/experimental-ct-react';
import React from 'react';

import { data as withdrawalsData } from 'mocks/shibarium/withdrawals';
import contextWithEnvs from 'playwright/fixtures/contextWithEnvs';
import TestApp from 'playwright/TestApp';
import buildApiUrl from 'playwright/utils/buildApiUrl';
import * as configs from 'playwright/utils/configs';

import ShibariuWithdrawals from './ShibariumWithdrawals';

const test = base.extend({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: contextWithEnvs(configs.featureEnvs.shibariumRollup) as any,
});

const WITHDRAWALS_API_URL = buildApiUrl('shibarium_withdrawals');
const WITHDRAWALS_COUNT_API_URL = buildApiUrl('shibarium_withdrawals_count');

test('base view +@mobile', async({ mount, page }) => {
  // test on mobile is flaky
  // my assumption is there is not enough time to calculate hashes truncation so component is unstable
  // so I raised the test timeout to check if it helps
  test.slow();
  await page.route('https://request-global.czilladx.com/serve/native.php?z=19260bf627546ab7242', (route) => route.fulfill({
    status: 200,
    body: '',
  }));

  await page.route(WITHDRAWALS_API_URL, (route) => route.fulfill({
    status: 200,
    body: JSON.stringify(withdrawalsData),
  }));

  await page.route(WITHDRAWALS_COUNT_API_URL, (route) => route.fulfill({
    status: 200,
    body: '397',
  }));

  const component = await mount(
    <TestApp>
      <ShibariuWithdrawals/>
    </TestApp>,
  );

  await expect(component).toHaveScreenshot({ timeout: 10_000 });
});
