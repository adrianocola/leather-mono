import { Pressable } from 'react-native';
import { Switch } from 'react-native-gesture-handler';

import { t } from '@lingui/macro';

import { Avatar, Flag, ItemLayout, PlaceholderIcon } from '@leather.io/ui/native';

import SettingsScreenLayout from '../settings-screen.layout';

// TODO: Hook up to notifications service when available or use Expo?
export default function SettingsNotificationsScreen() {
  return (
    <SettingsScreenLayout>
      <Pressable onPress={() => {}}>
        <Flag
          img={
            <Avatar>
              <PlaceholderIcon />
            </Avatar>
          }
        >
          <ItemLayout
            actionIcon={<Switch disabled value={false} />}
            titleLeft={t`Notification`}
            captionLeft={t`Description`}
          />
        </Flag>
      </Pressable>
    </SettingsScreenLayout>
  );
}
