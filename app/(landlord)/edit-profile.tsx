import { useState, useCallback } from 'react';
import { Alert, ScrollView, View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '@clerk/expo';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import {
  ArrowLeft,
  Check,
  Lock,
  ChevronDown,
  User,
} from 'lucide-react-native';

import { tokens } from '@/src/theme/tokens';
import { useAuthStore } from '@/src/store/authStore';
import { useClerkSupabase } from '@/src/hooks/useClerkSupabase';
import { uploadAvatar } from '@/src/services/storage.service';
import { getErrorMessage } from '@/src/lib/result';

const { color, space, radius, font, size } = tokens;

// ─── Helpers ─────────────────────────────────────────────────────────────────

const compressImage = async (uri: string): Promise<string> => {
  const result = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: 400, height: 400 } }],
    { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG },
  );
  return result.uri;
};

// ─── Screen ──────────────────────────────────────────────────────────────────

export default function EditProfileScreen() {
  const router = useRouter();
  const { userId } = useAuth();
  const supabase = useClerkSupabase();
  const { profile, setProfile } = useAuthStore();
  const [fullName, setFullName] = useState(profile?.full_name ?? 'Sarina Shrestha');
  const [city, setCity] = useState(profile?.city ?? 'Kathmandu');
  const phoneNumber = profile?.phone ?? '+977 98123XXXXX';

  // ── Avatar Upload ─────────────────────────────────────────────────────────

  const handleUpload = useCallback(
    async (localUri: string) => {
      if (!userId || !profile) return;
      try {
        const compressed = await compressImage(localUri);
        const uploadResult = await uploadAvatar(userId, compressed, supabase);
        if (!uploadResult.success) {
          Alert.alert('Upload failed', uploadResult.error);
          return;
        }
        setProfile({ ...profile, avatar_url: uploadResult.data.publicUrl });
      } catch (e) {
        Alert.alert('Upload error', getErrorMessage(e));
      }
    },
    [userId, profile, supabase, setProfile],
  );

  const pickFromLibrary = useCallback(async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        'Permission Required',
        'Please allow photo library access in your settings to set a profile photo.',
      );
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled && result.assets[0]) {
      handleUpload(result.assets[0].uri);
    }
  }, [handleUpload]);

  const pickFromCamera = useCallback(async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        'Permission Required',
        'Please allow camera access in your settings to take a profile photo.',
      );
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled && result.assets[0]) {
      handleUpload(result.assets[0].uri);
    }
  }, [handleUpload]);

  const showAvatarOptions = useCallback(() => {
    Alert.alert('Profile Photo', 'Choose an option', [
      { text: 'Take Photo', onPress: pickFromCamera },
      { text: 'Choose from Library', onPress: pickFromLibrary },
      ...(profile?.avatar_url
        ? [
            {
              text: 'Remove Photo',
              style: 'destructive' as const,
              onPress: () => profile && setProfile({ ...profile, avatar_url: null }),
            },
          ]
        : []),
      { text: 'Cancel', style: 'cancel' },
    ]);
  }, [pickFromCamera, pickFromLibrary, profile?.avatar_url, setProfile]);

  // ── Save ──────────────────────────────────────────────────────────────────

  const handleSave = useCallback(() => {
    // TODO: persist name + city to Supabase
    router.back();
  }, [router]);

  const handleGoBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleDeleteAccount = useCallback(() => {
    // TODO: account deletion workflow
  }, []);

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      {/* ─── Header ──────────────────────────────────────────────────── */}
      <View style={styles.header}>
        <Pressable
          onPress={handleGoBack}
          style={styles.backButton}
          accessibilityLabel="Go back"
          accessibilityRole="button">
          <ArrowLeft size={18} color={color.ink} strokeWidth={2.2} />
        </Pressable>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <Pressable
          onPress={handleSave}
          accessibilityLabel="Save"
          accessibilityRole="button">
          <Text style={styles.saveText}>Save</Text>
        </Pressable>
      </View>
      <View style={styles.headerDivider} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        {/* ─── Avatar Section ────────────────────────────────────────── */}
        <View style={styles.avatarSection}>
          <Pressable onPress={showAvatarOptions} accessibilityLabel="Change profile photo">
            <View style={styles.avatarOuterRing}>
              <View style={styles.avatarInnerRing}>
                <User size={36} color={color.ink3} strokeWidth={1.5} />
              </View>
            </View>
          </Pressable>
          <Pressable onPress={showAvatarOptions} accessibilityLabel="Change photo" accessibilityRole="button">
            <Text style={styles.changePhotoText}>Change Photo</Text>
          </Pressable>
          <Text style={styles.photoSubtext}>JPEG or PNG · Max 5MB</Text>
        </View>

        {/* ─── PERSONAL INFO Section ─────────────────────────────────── */}
        <Text style={styles.sectionLabel}>PERSONAL INFO</Text>

        {/* Full Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Full name</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={fullName}
              onChangeText={setFullName}
              placeholder="Full name"
              placeholderTextColor={color.placeholder}
            />
            <Check size={18} color="#1A6B4A" strokeWidth={2.5} />
          </View>
        </View>

        {/* Phone Number (disabled) */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Phone number</Text>
          <View style={[styles.inputContainer, styles.inputContainerDisabled]}>
            <TextInput
              style={[styles.input, styles.inputDisabled]}
              value={phoneNumber}
              editable={false}
            />
            <Lock size={16} color={color.ink3} strokeWidth={1.8} />
          </View>
          <View style={styles.verifiedRow}>
            <Check size={11} color="#1A6B4A" strokeWidth={3} />
            <Text style={styles.verifiedText}>Verified</Text>
          </View>
        </View>

        {/* City */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Your city</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={city}
              onChangeText={setCity}
              placeholder="Your city"
              placeholderTextColor={color.placeholder}
            />
            <ChevronDown size={18} color={color.ink3} strokeWidth={2} />
          </View>
        </View>

        {/* ─── DANGER ZONE Section ───────────────────────────────────── */}
        <Text style={styles.dangerSectionLabel}>DANGER ZONE</Text>

        <View style={styles.dangerCard}>
          <Text style={styles.dangerTitle}>Delete Account</Text>
          <Text style={styles.dangerDescription}>
            Permanently delete your account and all data. This cannot be undone.
          </Text>
          <Pressable
            onPress={handleDeleteAccount}
            style={styles.deleteButton}
            accessibilityLabel="Delete my account"
            accessibilityRole="button">
            <Text style={styles.deleteButtonText}>Delete My Account</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: color.bg,
  },

  // Header
  header: {
    height: space.headerH,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: space.screenH,
    backgroundColor: color.bg,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: color.input,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: font.semibold,
    fontSize: 17,
    color: color.ink,
  },
  saveText: {
    fontFamily: font.semibold,
    fontSize: size.body,
    color: color.brand,
  },
  headerDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
  },

  // Scroll
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: space.screenH,
    paddingTop: 28,
    paddingBottom: 40,
  },

  // Avatar
  avatarSection: {
    alignItems: 'center',
    marginBottom: 28,
  },
  avatarOuterRing: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 2,
    borderColor: color.line,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  avatarInnerRing: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: color.input,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changePhotoText: {
    fontFamily: font.semibold,
    fontSize: size.body,
    color: color.brand,
    marginBottom: 4,
  },
  photoSubtext: {
    fontFamily: font.sans,
    fontSize: size.caption,
    color: color.ink3,
  },

  // Section label
  sectionLabel: {
    fontFamily: font.bold,
    fontSize: size.caption,
    color: color.ink3,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 14,
  },

  // Input
  inputGroup: {
    marginBottom: 18,
  },
  inputLabel: {
    fontFamily: font.sans,
    fontSize: size.bodySm,
    color: color.ink2,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    borderRadius: radius.md,
    backgroundColor: color.input,
    paddingHorizontal: space.cardPad,
    gap: 8,
  },
  inputContainerDisabled: {
    backgroundColor: color.inputReadonly,
  },
  input: {
    flex: 1,
    fontFamily: font.sans,
    fontSize: size.body,
    color: color.ink,
  },
  inputDisabled: {
    color: color.ink2,
  },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
  },
  verifiedText: {
    fontFamily: font.medium,
    fontSize: size.caption,
    color: '#1A6B4A',
  },

  // Danger zone
  dangerSectionLabel: {
    fontFamily: font.bold,
    fontSize: size.caption,
    color: color.danger,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginTop: 12,
    marginBottom: 14,
  },
  dangerCard: {
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: '#FFCDD2',
    backgroundColor: color.bg,
    padding: space.cardPad,
  },
  dangerTitle: {
    fontFamily: font.bold,
    fontSize: size.body,
    color: color.danger,
    marginBottom: 6,
  },
  dangerDescription: {
    fontFamily: font.sans,
    fontSize: size.bodySm,
    color: color.ink2,
    lineHeight: 20,
    marginBottom: 16,
  },
  deleteButton: {
    borderRadius: radius.pill,
    backgroundColor: '#FFEBEE',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  deleteButtonText: {
    fontFamily: font.semibold,
    fontSize: size.bodySm,
    color: '#C62828',
  },
});
