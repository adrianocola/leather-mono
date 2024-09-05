import { WalletStore } from '@/store/wallets/wallets.write';
import { t } from '@lingui/macro';
import { useTheme } from '@shopify/restyle';

import { Box, ChevronRightIcon, Text, Theme, TouchableOpacity } from '@leather.io/ui/native';

export interface AccountCardProps {
  onPress(): void;
  fingerprint: string;
  type: WalletStore['type'];
}
export function AccountCard({ onPress, fingerprint, type }: AccountCardProps) {
  const theme = useTheme<Theme>();
  const isLedger = type === 'ledger';
  return (
    <TouchableOpacity
      onPress={onPress}
      width={200}
      height={180}
      p="5"
      borderRadius="sm"
      borderColor="ink.border-transparent"
      borderWidth={1}
      alignItems="flex-start"
      justifyContent="space-between"
    >
      {isLedger && (
        <Box
          position="absolute"
          p="1"
          borderColor="ink.border-transparent"
          borderRadius="xs"
          borderWidth={1}
          right={theme.spacing[5]}
          top={theme.spacing[5]}
        >
          <Text variant="label03" color="ink.text-subdued">
            {t`Ledger`}
          </Text>
        </Box>
      )}
      <Box p="2" borderRadius="round" backgroundColor="ink.background-secondary">
        <ChevronRightIcon width={32} height={32} />
      </Box>
      <Box gap="1">
        <Text variant="label02">$0</Text>
        <Text variant="label02" color="ink.text-subdued">
          {fingerprint}
        </Text>
      </Box>
    </TouchableOpacity>
  );
}
