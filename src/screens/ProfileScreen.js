import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import { COLORS, GLOBAL_STYLES } from '../constants/theme';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthService } from '../services/authService';
import Toast from 'react-native-toast-message';

export default function ProfileScreen({ route }) {
  const { user, onLogout } = route.params || {};
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    fullName: user?.fullName || user?.name || 'User',
    email: user?.email || 'user@example.com',
    phone: user?.phone || '',
  });

  const MenuItem = ({ iconSet, iconName, title, onPress }) => {
    const IconComponent = iconSet;
    return (
      <TouchableOpacity style={styles.menuItemRow} onPress={onPress}>
        <View style={styles.iconContainer}>
          <IconComponent name={iconName} size={20} color={COLORS.textPrimary} />
        </View>
        <Text style={styles.menuItemText}>{title}</Text>
        <Feather name="chevron-right" size={20} color={COLORS.textPlaceholder} style={styles.chevronRight} />
      </TouchableOpacity>
    );
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await AuthService.updateProfile({ fullName: profile.fullName, email: profile.email, phone: profile.phone });
      if (res.success) {
        Toast.show({ type: 'success', text1: 'Profile updated' });
        setProfile({
          fullName: res.user.fullName,
          email: res.user.email,
          phone: res.user.phone,
        });
        setIsEditing(false);
      }
    } catch (e) {
      Toast.show({ type: 'error', text1: 'Update failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.circularHeaderButton}>
          <Feather name="arrow-left" size={20} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <Feather name="more-horizontal" size={20} color={COLORS.textPrimary} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
<View style={styles.profileHeaderCard}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image 
              source={{ uri: user?.avatar || `https://i.pravatar.cc/150?u=${user?.id || user?.email || 'default'}` }} 
              style={styles.avatarImage} 
            />
            <View style={styles.profileMetaDetails}>
              {isEditing ? (
                <>
                  <TextInput
                    style={[styles.profileNameText, styles.editInput]}
                    value={profile.fullName}
                    onChangeText={(v) => setProfile({ ...profile, fullName: v })}
                    placeholder="Name"
                    placeholderTextColor={COLORS.textPlaceholder}
                  />
                  <TextInput
                    style={[styles.profileEmailText, styles.editInput]}
                    value={profile.email}
                    onChangeText={(v) => setProfile({ ...profile, email: v })}
                    placeholder="Email"
                    placeholderTextColor={COLORS.textPlaceholder}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  <TextInput
                    style={[styles.profilePhoneText, styles.editInput]}
                    value={profile.phone}
                    onChangeText={(v) => setProfile({ ...profile, phone: v })}
                    placeholder="Phone"
                    placeholderTextColor={COLORS.textPlaceholder}
                    keyboardType="phone-pad"
                  />
                </>
              ) : (
                <>
                  <Text style={styles.profileNameText}>{profile.fullName}</Text>
                  <Text style={styles.profileEmailText}>{profile.email}</Text>
                  <Text style={styles.profilePhoneText}>{profile.phone}</Text>
                </>
              )}
            </View>
          </View>
          <TouchableOpacity onPress={isEditing ? handleSave : () => setIsEditing(true)} style={{ alignSelf: 'flex-end' }}>
            <Text style={{ color: COLORS.primary, fontWeight: '600', fontSize: 13 }}>{isEditing ? 'Save' : 'Edit'}</Text>
          </TouchableOpacity>
        </View>

        <Text style={GLOBAL_STYLES.sectionTitle}>Account</Text>
        <View style={GLOBAL_STYLES.menuRowCard}>
          <MenuItem iconSet={Feather} iconName="user" title="Account Information" />
          <MenuItem iconSet={MaterialCommunityIcons} iconName="package-variant-closed" title="My Orders" />
          <MenuItem iconSet={Ionicons} iconName="location-outline" title="Address Management" />
          <MenuItem iconSet={Feather} iconName="settings" title="Setting" />
          <MenuItem iconSet={Feather} iconName="lock" title="Password Manager" />
        </View>

        <Text style={GLOBAL_STYLES.sectionTitle}>Support</Text>
        <View style={GLOBAL_STYLES.menuRowCard}>
          <MenuItem iconSet={Feather} iconName="help-circle" title="Help Center" />
          <MenuItem iconSet={Feather} iconName="log-out" title="Logout" onPress={onLogout} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    width: '100%',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'between',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
    width: '100%',
  },
  circularHeaderButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
    alignItems: 'center',
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.border,
  },
  profileHeaderCard: {
    backgroundColor: '#F5F6FA',
    borderRadius: 24,
    padding: 16,
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 24,
  },
  profileMetaDetails: {
    flex: 1,
    marginLeft: 16,
  },
  profileNameText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  profileEmailText: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  profilePhoneText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  editInput: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: 6,
    paddingBottom: 4,
  },
  menuItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F6FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  menuItemText: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.textPrimary,
    flex: 1,
  },
  chevronRight: {
    marginLeft: 'auto',
  },
});