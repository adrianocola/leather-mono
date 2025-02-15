import { useRef } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AddWalletSheet } from '@/components/add-wallet/';
import { Divider } from '@/components/divider';
import { WalletsList } from '@/components/wallet-settings/wallets-list';
import { AppRoutes } from '@/routes';
import { useAccounts } from '@/store/accounts/accounts.read';
import { t } from '@lingui/macro';
import { useTheme } from '@shopify/restyle';
import { useRouter } from 'expo-router';

import { Box, Cell, Eye1ClosedIcon, PlusIcon, SheetRef, Theme } from '@leather.io/ui/native';

export default function SettingsScreen() {
  const { bottom } = useSafeAreaInsets();
  const theme = useTheme<Theme>();
  const router = useRouter();
  const addWalletSheetRef = useRef<SheetRef>(null);
  const hiddenAccounts = useAccounts('hidden');
  const hiddenAccountsLength = hiddenAccounts.list.length;
  return (
    <>
      <Box justifyContent="space-between" flex={1} backgroundColor="ink.background-primary">
        <ScrollView
          contentContainerStyle={{
            paddingTop: theme.spacing['5'],
            paddingBottom: theme.spacing['5'] + bottom,
            gap: theme.spacing[5],
          }}
        >
          <Box px="5">
            <WalletsList variant="active" />
          </Box>
        </ScrollView>
        <Box>
          <Divider />
          <Box px="5" pt="5" style={{ paddingBottom: theme.spacing['5'] + bottom }} gap="6">
            <Cell
              title={t`Hidden accounts`}
              subtitle={t`${hiddenAccountsLength} hidden accounts`}
              Icon={Eye1ClosedIcon}
              onPress={() => {
                router.navigate(AppRoutes.SettingsWalletHiddenAccounts);
              }}
            />
            <Cell
              title={t`Add wallet`}
              Icon={PlusIcon}
              onPress={() => {
                addWalletSheetRef.current?.present();
              }}
            />
          </Box>
        </Box>
      </Box>
      <AddWalletSheet addWalletSheetRef={addWalletSheetRef} />
    </>
  );
}
