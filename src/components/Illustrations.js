import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Path, RadialGradient, Rect, Stop } from 'react-native-svg';
import { COLORS } from '../constants/theme';

export function SignInIllustration() {
  return (
    <View style={{ width: 200, height: 180, justifyContent: 'center', alignItems: 'center' }}>
      <Svg width={180} height={140} viewBox="0 0 180 140">
        <Defs>
          <RadialGradient id="signInDeskGlow" cx="50%" cy="40%" r="70%">
            <Stop offset="0%" stopColor="#FFFFFF" />
            <Stop offset="62%" stopColor="#EAF2FF" />
            <Stop offset="100%" stopColor="#CFE0FF" />
          </RadialGradient>
          <LinearGradient id="signInDeskSkin" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor="#FFE1C4" />
            <Stop offset="100%" stopColor="#E9A77A" />
          </LinearGradient>
          <LinearGradient id="signInDeskShirt" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#6366F1" />
            <Stop offset="100%" stopColor="#3730A3" />
          </LinearGradient>
          <LinearGradient id="signInDeskLaptop" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor="#334155" />
            <Stop offset="100%" stopColor="#0F172A" />
          </LinearGradient>
          <LinearGradient id="signInDeskScreen" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#FFFFFF" />
            <Stop offset="100%" stopColor="#EAF1FF" />
          </LinearGradient>
        </Defs>

        <Circle cx="90" cy="72" r="62" fill="url(#signInDeskGlow)" />
        <Rect x="34" y="112" width="112" height="14" rx="7" fill="#CBD5E1" opacity="0.75" />
        <Rect x="60" y="56" width="60" height="54" rx="22" fill="#1E293B" opacity="0.16" />

        <Path d="M70 82c-10 8-15 17-18 27" fill="none" stroke="url(#signInDeskShirt)" strokeWidth="10" strokeLinecap="round" />
        <Path d="M110 82c10 8 15 17 18 27" fill="none" stroke="url(#signInDeskShirt)" strokeWidth="10" strokeLinecap="round" />
        <Path d="M66 62c6-9 15-14 24-14s18 5 24 14l12 35H54l12-35Z" fill="url(#signInDeskShirt)" />
        <Path d="M72 66c5 4 11 6 18 6s13-2 18-6l5 18H67l5-18Z" fill="#FFFFFF" opacity="0.1" />
        <Path d="M78 67c3 7 7 10 12 10s9-3 12-10l5 18H73l5-18Z" fill="#F8FAFC" opacity="0.95" />
        <Rect x="85" y="62" width="10" height="17" rx="5" fill="url(#signInDeskSkin)" />

        <Circle cx="90" cy="45" r="16" fill="url(#signInDeskSkin)" />
        <Circle cx="73" cy="47" r="4" fill="#F0B087" />
        <Circle cx="74" cy="47" r="2" fill="#E9A776" opacity="0.7" />
        <Path d="M75 42c-3-9 2-18 10-21 8-3 17 1 20 10 2 5 1 9-2 13-4-5-10-8-17-6-4 1-8 3-11 4Z" fill="#1F2937" />
        <Path d="M75 42c2-9 9-14 17-13 6 1 11 5 13 12-5-3-10-4-15-3-6 1-11 3-15 4Z" fill="#111827" opacity="0.7" />
        <Path d="M74 42c-3 4-4 9-2 15-4-2-7-7-7-11 0-4 3-7 9-4Z" fill="#1F2937" />
        <Path d="M83 44c2 2 5 2 7 0" stroke="#7C4A32" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <Circle cx="84" cy="48" r="1.3" fill="#3B2A22" />
        <Circle cx="96" cy="48" r="1.3" fill="#3B2A22" />
        <Circle cx="81" cy="53" r="3" fill="#F4A38A" opacity="0.22" />
        <Circle cx="99" cy="53" r="3" fill="#F4A38A" opacity="0.22" />
        <Path d="M90 49v5c0 2 1 3 2 4" stroke="#C9825C" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.55" />
        <Path d="M86 57c3 3 7 3 10 0" stroke="#8B4A3B" strokeWidth="1.6" strokeLinecap="round" fill="none" />

        <Rect x="53" y="64" width="74" height="38" rx="8" fill="url(#signInDeskLaptop)" />
        <Rect x="59" y="70" width="62" height="25" rx="5" fill="url(#signInDeskScreen)" />
        <Circle cx="90" cy="78" r="5" fill={COLORS.primary} opacity="0.16" />
        <Rect x="87" y="75" width="6" height="6" rx="2" fill="none" stroke={COLORS.primary} strokeWidth="1.4" />
        <Rect x="88" y="80" width="4" height="4" rx="1" fill={COLORS.primary} />
        <Rect x="70" y="86" width="17" height="3" rx="1.5" fill="#CBD5E1" />
        <Rect x="70" y="91" width="12" height="3" rx="1.5" fill="#CBD5E1" />
        <Rect x="94" y="86" width="16" height="3" rx="1.5" fill="#CBD5E1" />
        <Rect x="94" y="91" width="10" height="3" rx="1.5" fill="#CBD5E1" />
        <Rect x="45" y="100" width="90" height="18" rx="8" fill="#111827" />
        <Rect x="51" y="103" width="78" height="9" rx="4" fill="#334155" />
        <Rect x="61" y="107" width="58" height="6" rx="3" fill="#CBD5E1" opacity="0.6" />
        <Path d="M68 109h5v2h-5zM76 109h5v2h-5zM84 109h5v2h-5zM92 109h5v2h-5zM100 109h5v2h-5zM108 109h5v2h-5z" fill="#64748B" />
        <Circle cx="74" cy="114" r="4.5" fill="url(#signInDeskSkin)" />
        <Circle cx="106" cy="114" r="4.5" fill="url(#signInDeskSkin)" />
        <Path d="M71 112c-2 2-1 5 2 6l6 2c3 1 5-1 5-3M103 112c-2 2-1 5 2 6l6 2c3 1 5-1 5-3" fill="none" stroke="#C9825C" strokeWidth="1.2" strokeLinecap="round" opacity="0.45" />
      </Svg>
    </View>
  );
}

export function SignUpIllustration() {
  return (
    <View style={{ width: 200, height: 180, justifyContent: 'center', alignItems: 'center' }}>
      <Svg width={180} height={140} viewBox="0 0 180 140">
        <Defs>
          <RadialGradient id="signUpKioskGlow" cx="48%" cy="40%" r="70%">
            <Stop offset="0%" stopColor="#FFFFFF" />
            <Stop offset="60%" stopColor="#F0F5FF" />
            <Stop offset="100%" stopColor="#DBE4FF" />
          </RadialGradient>
          <LinearGradient id="signUpKioskSkin" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor="#FFE0C2" />
            <Stop offset="100%" stopColor="#E9A776" />
          </LinearGradient>
          <LinearGradient id="signUpKioskShirt" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#F59E0B" />
            <Stop offset="100%" stopColor="#B45309" />
          </LinearGradient>
          <LinearGradient id="signUpKioskCard" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor="#4F46E5" />
            <Stop offset="100%" stopColor="#312E81" />
          </LinearGradient>
          <LinearGradient id="signUpKioskForm" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#FFFFFF" />
            <Stop offset="100%" stopColor="#EEF2FF" />
          </LinearGradient>
        </Defs>

        <Circle cx="90" cy="72" r="62" fill="url(#signUpKioskGlow)" />
        <Rect x="30" y="112" width="120" height="14" rx="7" fill="#E0E7FF" opacity="0.7" />
        <Rect x="112" y="101" width="18" height="18" rx="5" fill="#A5B4FC" opacity="0.55" />
        <Rect x="103" y="119" width="38" height="8" rx="4" fill="#6366F1" opacity="0.35" />

        <Path d="M42 82c-7 9-11 20-13 32" fill="none" stroke="url(#signUpKioskShirt)" strokeWidth="10" strokeLinecap="round" />
        <Path d="M78 82c10 9 16 19 20 31" fill="none" stroke="url(#signUpKioskShirt)" strokeWidth="10" strokeLinecap="round" />
        <Path d="M38 77c7-10 17-15 29-15s22 5 29 15l12 48H26l12-48Z" fill="url(#signUpKioskShirt)" />
        <Path d="M44 80c7 5 15 7 23 7s16-2 23-7l5 20H39l5-20Z" fill="#FFFFFF" opacity="0.1" />
        <Path d="M55 82c3 7 7 10 12 10s9-3 12-10l6 20H49l6-20Z" fill="#FFFBEB" opacity="0.95" />
        <Path d="M50 101c2-4 5-6 10-6h14c5 0 8 2 10 6l-3 22H53l-3-22Z" fill="#92400E" opacity="0.62" />
        <Path d="M58 105h20" stroke="#FDE68A" strokeWidth="2" strokeLinecap="round" opacity="0.55" />

        <Path d="M43 124h30v20H58v-13H38v13H43z" fill="#334155" />
        <Path d="M60 124h30v20h-15v-13H55v13H60z" fill="#1E293B" />
        <Path d="M38 139h24v4H38z" fill="#020617" />
        <Path d="M76 139h24v4H76z" fill="#020617" />

        <Rect x="82" y="64" width="10" height="17" rx="5" fill="url(#signUpKioskSkin)" />
        <Path d="M72 66c4 4 9 6 15 6s11-2 15-6l-3 13H75l-3-13Z" fill="#000000" opacity="0.08" />
        <Circle cx="58" cy="48" r="16" fill="url(#signUpKioskSkin)" />
        <Circle cx="42" cy="50" r="4" fill="#F0B087" />
        <Circle cx="43" cy="50" r="2" fill="#E9A776" opacity="0.7" />
        <Path d="M43 45c-3-9 2-18 10-21 8-3 17 1 20 10 2 5 1 9-2 13-4-5-10-8-17-6-4 1-8 3-11 4Z" fill="#2D3748" />
        <Path d="M43 45c2-9 9-14 17-13 6 1 11 5 13 12-5-3-10-4-15-3-6 1-11 3-15 4Z" fill="#1F2937" opacity="0.75" />
        <Path d="M42 45c-3 4-4 9-2 15-4-2-7-7-7-11 0-4 3-7 9-4Z" fill="#2D3748" />
        <Path d="M51 47c2 2 5 2 7 0" stroke="#7C4A32" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <Circle cx="52" cy="51" r="1.3" fill="#3B2A22" />
        <Circle cx="64" cy="51" r="1.3" fill="#3B2A22" />
        <Circle cx="49" cy="56" r="3" fill="#F4A38A" opacity="0.22" />
        <Circle cx="69" cy="56" r="3" fill="#F4A38A" opacity="0.22" />
        <Path d="M58 52v5c0 2 1 3 2 4" stroke="#C9825C" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.55" />
        <Path d="M54 60c3 3 7 3 10 0" stroke="#8B4A3B" strokeWidth="1.6" strokeLinecap="round" fill="none" />

        <Rect x="93" y="48" width="52" height="60" rx="12" fill="url(#signUpKioskCard)" />
        <Rect x="100" y="56" width="38" height="44" rx="7" fill="url(#signUpKioskForm)" />
        <Circle cx="119" cy="64" r="5" fill={COLORS.primary} opacity="0.16" />
        <Path d="M116 64l2 2 5-6" fill="none" stroke={COLORS.primary} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <Rect x="108" y="74" width="20" height="3" rx="1.5" fill="#CBD5E1" />
        <Rect x="108" y="82" width="16" height="3" rx="1.5" fill="#CBD5E1" />
        <Rect x="108" y="92" width="20" height="5" rx="2.5" fill={COLORS.primary} />
        <Rect x="115" y="94" width="3" height="1.5" fill="white" />
        <Circle cx="103" cy="103" r="5" fill="url(#signUpKioskSkin)" />
        <Path d="M100 100c-2 2-1 5 2 6l7 2c3 1 5-1 5-3" fill="none" stroke="#C9825C" strokeWidth="1.2" strokeLinecap="round" opacity="0.45" />
        <Path d="M99 105l13-13" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
        <Circle cx="112" cy="92" r="2" fill="#111827" />
      </Svg>
    </View>
  );
}

export function ForgotPasswordIllustration() {
  return (
    <View style={{ width: 200, height: 180, justifyContent: 'center', alignItems: 'center' }}>
      <Svg width={180} height={140} viewBox="0 0 180 140">
        <Defs>
          <RadialGradient id="forgotMailGlow" cx="50%" cy="40%" r="70%">
            <Stop offset="0%" stopColor="#FFFFFF" />
            <Stop offset="62%" stopColor="#FFF3E6" />
            <Stop offset="100%" stopColor="#FFE0BA" />
          </RadialGradient>
          <LinearGradient id="forgotMailSkin" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor="#FFE0C2" />
            <Stop offset="100%" stopColor="#E9A776" />
          </LinearGradient>
          <LinearGradient id="forgotMailShirt" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#0EA5E9" />
            <Stop offset="100%" stopColor="#0369A1" />
          </LinearGradient>
          <LinearGradient id="forgotMailEnvelope" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor="#FFFFFF" />
            <Stop offset="100%" stopColor="#F8FAFC" />
          </LinearGradient>
        </Defs>

        <Circle cx="90" cy="72" r="62" fill="url(#forgotMailGlow)" />
        <Rect x="30" y="112" width="120" height="14" rx="7" fill="#FED7AA" opacity="0.65" />
        <Path d="M43 82c-7 10-12 22-14 35" fill="none" stroke="url(#forgotMailShirt)" strokeWidth="10" strokeLinecap="round" />
        <Path d="M78 82c10 10 16 22 19 35" fill="none" stroke="url(#forgotMailShirt)" strokeWidth="10" strokeLinecap="round" />
        <Path d="M38 77c7-10 17-15 29-15s22 5 29 15l12 48H26l12-48Z" fill="url(#forgotMailShirt)" />
        <Path d="M44 80c7 5 15 7 23 7s16-2 23-7l5 20H39l5-20Z" fill="#FFFFFF" opacity="0.1" />
        <Path d="M55 82c3 7 7 10 12 10s9-3 12-10l6 20H49l6-20Z" fill="#E0F2FE" opacity="0.95" />
        <Path d="M50 101c2-4 5-6 10-6h14c5 0 8 2 10 6l-3 22H53l-3-22Z" fill="#075985" opacity="0.58" />
        <Path d="M58 105h20" stroke="#BAE6FD" strokeWidth="2" strokeLinecap="round" opacity="0.55" />

        <Path d="M43 124h30v20H58v-13H38v13H43z" fill="#334155" />
        <Path d="M60 124h30v20h-15v-13H55v13H60z" fill="#1E293B" />
        <Path d="M38 139h24v4H38z" fill="#020617" />
        <Path d="M76 139h24v4H76z" fill="#020617" />

        <Rect x="82" y="64" width="10" height="17" rx="5" fill="url(#forgotMailSkin)" />
        <Path d="M72 66c4 4 9 6 15 6s11-2 15-6l-3 13H75l-3-13Z" fill="#000000" opacity="0.08" />
        <Circle cx="58" cy="48" r="16" fill="url(#forgotMailSkin)" />
        <Circle cx="42" cy="50" r="4" fill="#F0B087" />
        <Circle cx="43" cy="50" r="2" fill="#E9A776" opacity="0.7" />
        <Path d="M43 45c-3-9 2-18 10-21 8-3 17 1 20 10 2 5 1 9-2 13-4-5-10-8-17-6-4 1-8 3-11 4Z" fill="#3B2F2F" />
        <Path d="M43 45c2-9 9-14 17-13 6 1 11 5 13 12-5-3-10-4-15-3-6 1-11 3-15 4Z" fill="#1F2937" opacity="0.72" />
        <Path d="M42 45c-3 4-4 9-2 15-4-2-7-7-7-11 0-4 3-7 9-4Z" fill="#3B2F2F" />
        <Path d="M51 47c2 2 5 2 7 0" stroke="#7C4A32" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <Circle cx="52" cy="51" r="1.3" fill="#3B2A22" />
        <Circle cx="64" cy="51" r="1.3" fill="#3B2A22" />
        <Circle cx="49" cy="56" r="3" fill="#F4A38A" opacity="0.22" />
        <Circle cx="69" cy="56" r="3" fill="#F4A38A" opacity="0.22" />
        <Path d="M58 52v5c0 2 1 3 2 4" stroke="#C9825C" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.55" />
        <Path d="M54 60c3 3 7 3 10 0" stroke="#8B4A3B" strokeWidth="1.6" strokeLinecap="round" fill="none" />

        <Rect x="82" y="55" width="70" height="50" rx="10" fill="url(#forgotMailEnvelope)" stroke="#CBD5E1" strokeWidth="1" />
        <Path d="M90 64l27 20 27-20" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M90 96l22-22 10 10 10-10 22 22" fill="none" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Rect x="108" y="74" width="12" height="12" rx="6" fill={COLORS.primary} opacity="0.16" />
        <Rect x="109" y="79" width="10" height="7" rx="1.5" fill={COLORS.primary} />
        <Rect x="119" y="81" width="18" height="4" rx="2" fill={COLORS.primary} />
        <Circle cx="136" cy="83" r="2.5" fill={COLORS.primary} />
        <Path d="M136 85v4M140 89h-4" stroke={COLORS.primary} strokeWidth="1.5" strokeLinecap="round" />
        <Rect x="93" y="101" width="48" height="4" rx="2" fill="#E2E8F0" />
        <Circle cx="102" cy="104" r="5" fill="url(#forgotMailSkin)" />
        <Path d="M99 101c-2 2-1 5 2 6l7 2c3 1 5-1 5-3" fill="none" stroke="#C9825C" strokeWidth="1.2" strokeLinecap="round" opacity="0.45" />
      </Svg>
    </View>
  );
}