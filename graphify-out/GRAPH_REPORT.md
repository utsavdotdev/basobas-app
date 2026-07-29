# Graph Report - basobas-app  (2026-07-29)

## Corpus Check
- 181 files · ~95,037 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1007 nodes · 1364 edges · 76 communities (65 shown, 11 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `720f2888`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_Community 54|Community 54]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 56|Community 56]]
- [[_COMMUNITY_Community 57|Community 57]]
- [[_COMMUNITY_Community 58|Community 58]]
- [[_COMMUNITY_Community 59|Community 59]]
- [[_COMMUNITY_Community 66|Community 66]]

## God Nodes (most connected - your core abstractions)
1. `useClerkSupabase()` - 23 edges
2. `ScreenHeader()` - 22 edges
3. `ok()` - 17 edges
4. `err()` - 17 edges
5. `useUserStore` - 17 edges
6. `expo` - 15 edges
7. `BasoBas — Tenant Experience` - 15 edges
8. `getErrorMessage()` - 14 edges
9. `useAuthStore` - 14 edges
10. `useOnboardingStore` - 14 edges

## Surprising Connections (you probably didn't know these)
- `HomeTab()` --calls--> `usePropertyStore`  [INFERRED]
  app/(tenant)/(tabs)/index.tsx → src/store/propertyStore.ts
- `LandlordDashboard()` --calls--> `useAuthStore`  [INFERRED]
  app/(landlord)/(tabs)/index.tsx → src/store/authStore.ts
- `ProfileTab()` --calls--> `useClerkSupabase()`  [INFERRED]
  app/(tenant)/(tabs)/profile.tsx → src/hooks/useClerkSupabase.ts
- `KYCUploadScreen()` --calls--> `useClerkSupabase()`  [EXTRACTED]
  app/(tenant)/kyc-upload.tsx → src/hooks/useClerkSupabase.ts
- `AuthGate()` --calls--> `useAuth()`  [INFERRED]
  app/_layout.tsx → src/hooks/useAuth.ts

## Import Cycles
- 1-file cycle: `metro.config.js -> metro.config.js`

## Communities (76 total, 11 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.05
Nodes (49): ConfirmationScreen(), DetailRowProps, styles, SummaryCardProps, DocTypeChipProps, DocumentUploadZoneProps, KYCLandlordScreen(), styles (+41 more)

### Community 1 - "Community 1"
Cohesion: 0.05
Nodes (42): ProGateState, useProGate(), useProGateStore, EsewaFormFields, PlanId, PurchasePlanState, usePurchasePlan(), ProGateModal() (+34 more)

### Community 2 - "Community 2"
Cohesion: 0.04
Nodes (47): dependencies, @clerk/expo, expo, expo-blur, expo-camera, expo-constants, expo-crypto, expo-document-picker (+39 more)

### Community 3 - "Community 3"
Cohesion: 0.13
Nodes (35): styles, err(), getErrorMessage(), ok(), Result, getLatestKYCSubmission(), getUserKYCStatusUi(), KYCInput (+27 more)

### Community 4 - "Community 4"
Cohesion: 0.08
Nodes (26): AuthGate(), LoadingScreen(), styles, maskPhone(), OTPVerificationScreen(), s, countryCodeToFlag(), PhoneEntryScreen() (+18 more)

### Community 5 - "Community 5"
Cohesion: 0.06
Nodes (27): AMENITIES, Amenity, FilterDrawer(), PROPERTY_TYPES, PropertyType, SortOption, SORTS, NotificationPrefsModal() (+19 more)

### Community 6 - "Community 6"
Cohesion: 0.07
Nodes (5): Props, ScreenHeader(), Props, GENERAL_REASONS, REASON_INFO

### Community 7 - "Community 7"
Cohesion: 0.05
Nodes (39): 1. Property Discovery, 1. Receive Request, 2. Request Creation, 2. Take Action on Request, 3. Awaiting Response, 3. Post-Visit Follow-Up, 48-Hour Reminder, 4. Managing Multiple Applicants (+31 more)

### Community 8 - "Community 8"
Cohesion: 0.06
Nodes (29): Amenity, AMENITY_ICONS, FORMATTER, { height: SCREEN_HEIGHT }, ListingDetail, ListingDetailScreenProps, MOCK_LISTING, Owner (+21 more)

### Community 9 - "Community 9"
Cohesion: 0.09
Nodes (25): HERO_BY_STATUS, HeroConfig, KYCStatusHero(), Props, styles, formatTime(), KYCStatusTimeline(), Props (+17 more)

### Community 10 - "Community 10"
Cohesion: 0.08
Nodes (21): DocumentTypeSelector(), DocumentTypeSelectorProps, KYCDocumentType, Option, OPTIONS, styles, DocumentUploadCard(), DocumentUploadCardProps (+13 more)

### Community 11 - "Community 11"
Cohesion: 0.07
Nodes (29): Add New Listing Flow (4 Steps), Add New Listing Prompt (Bottom of List), All Applicants Screen, BasoBas — Landlord Experience, Everything the Landlord Sees and Does, Filter Tab Bar, Header, Landlord Bottom Navigation Dock (+21 more)

### Community 12 - "Community 12"
Cohesion: 0.07
Nodes (28): backgroundColor, foregroundImage, adaptiveIcon, newArchEnabled, package, tsconfigPaths, typedRoutes, expo (+20 more)

### Community 13 - "Community 13"
Cohesion: 0.07
Nodes (27): BasoBas — Tenant Experience, Category Chips (Horizontal Scroll), Content Area (Scrollable), Content Sections (Top to Bottom), Everything the Tenant Sees and Does, Filter Options, Gallery Header, Header (Fixed, Always Visible) (+19 more)

### Community 14 - "Community 14"
Cohesion: 0.11
Nodes (16): FeatureSlide, s, SLIDES, MapIllustration(), styles, NextButton, NextButtonProps, OnboardingLayoutProps (+8 more)

### Community 15 - "Community 15"
Cohesion: 0.08
Nodes (23): devDependencies, @babel/core, babel-preset-expo, eslint, eslint-config-expo, eslint-config-prettier, prettier, prettier-plugin-tailwindcss (+15 more)

### Community 16 - "Community 16"
Cohesion: 0.17
Nodes (11): DockTab, DockTabProps, styles, LANDLORD_DOCK_ITEMS, TENANT_DOCK_ITEMS, GlassDock(), styles, FloatingDock (+3 more)

### Community 17 - "Community 17"
Cohesion: 0.19
Nodes (12): getJwks(), getJwksUrl(), verifyClerkJwt(), arrayBufferToBase64(), checkEsewaTransactionStatus(), generateSignature(), getEsewaConfig(), grantUserPass() (+4 more)

### Community 18 - "Community 18"
Cohesion: 0.11
Nodes (18): BasoBas — Authentication & Onboarding Flow, Every Step, Every Rule, Every Decision, KYC Verification States, OTP Technical Rules, Profile Setup Rules, Returning User Flow, Screen 01 — Landing Screen, Screen 02 — Phone Entry Screen (+10 more)

### Community 19 - "Community 19"
Cohesion: 0.12
Nodes (10): dockBottomReserve(), ActivityItem, DEFAULT_ACTIVITY, DEFAULT_INSIGHTS, DEFAULT_STATS, InsightItem, LandlordDashboard(), LandlordDashboardProps (+2 more)

### Community 20 - "Community 20"
Cohesion: 0.11
Nodes (17): 1. Privacy First — The Address Rule, 2. No Broker, No Commission, 3. Verification Builds Trust, 4. Phone Number Is Identity, 5. Broker Replacement, Not Broker Supplement, BasoBas — Product Vision, Core Principles, Dual Role Users (+9 more)

### Community 21 - "Community 21"
Cohesion: 0.15
Nodes (13): EMPTY_COPY, formatDate(), subtitleFor(), TabKey, TABS, Visit, VisitCard(), VISITS (+5 more)

### Community 22 - "Community 22"
Cohesion: 0.12
Nodes (15): BasoBas Design System, Border Radius, Buttons, Cards, Colors, Components, Do's and Don'ts, Elevation (+7 more)

### Community 23 - "Community 23"
Cohesion: 0.13
Nodes (10): AMENITIES_APARTMENT, AMENITIES_HOUSE, AMENITIES_ROOM, AMENITIES_STUDIO, BATHROOM_OPTIONS, FURNISHING, KITCHEN_OPTIONS, KITCHENETTE_OPTIONS (+2 more)

### Community 24 - "Community 24"
Cohesion: 0.15
Nodes (8): getRadiusCircleSizeForKm(), RadiusMapView(), RadiusMapViewProps, RING_COLORS, ALL_NEARBY, NearbyProperty, NEPAL_LOCATIONS, SearchLocation

### Community 25 - "Community 25"
Cohesion: 0.15
Nodes (10): FilterTab, formatPrice(), FORMATTER, LandlordProperty, MyPropertiesScreenProps, PROPERTIES_DATA, PropertyCard(), PropertyStatus (+2 more)

### Community 26 - "Community 26"
Cohesion: 0.15
Nodes (12): 1. Create an eSewa Order, 2. Verify the Database, 3. Simulate the eSewa Callback (Verify Payment), 4. Simulate a Failure Callback, 5. Check Payment Status (Polling), End-to-End Test Flow, eSewa v2 (Test/UAT) Payment — Testing Guide, Flow Overview (+4 more)

### Community 27 - "Community 27"
Cohesion: 0.18
Nodes (6): DetailRowProps, MOCK_VISIT, STATUS_STYLES, styles, SummaryCardProps, VisitData

### Community 28 - "Community 28"
Cohesion: 0.25
Nodes (6): ScreenBody(), ScreenBodyProps, ScreenBodyWithActionProps, CITIES, City, HomeTab()

### Community 29 - "Community 29"
Cohesion: 0.22
Nodes (8): BasoBas — Project Documentation Index, Critical Rules — Read Before Anything Else, Documentation Files, Platform, Reading Order by Role, Rental Marketplace App for Nepal · Version 1.0, The Problem in One Paragraph, What is BasoBas?

### Community 30 - "Community 30"
Cohesion: 0.22
Nodes (4): MenuRowProps, MenuRowWithSubtextProps, styles, ToggleProps

### Community 31 - "Community 31"
Cohesion: 0.25
Nodes (7): BasoBas — Complete Feature List, Core Features — Free for All Users, Every Feature, Who It Serves, and Whether It Is Free or Pro, Features That Will Never Be Gated, Free Tier Limits, Post-MVP Roadmap Features, Pro Features — Tenant Only, Paid Plan

### Community 32 - "Community 32"
Cohesion: 0.29
Nodes (5): BG_MAP, ChipColor, ChipVariant, Props, TEXT_MAP

### Community 33 - "Community 33"
Cohesion: 0.29
Nodes (5): RequestStatus, Tab, TABS, VISIT_REQUESTS, VisitRequest

### Community 34 - "Community 34"
Cohesion: 0.29
Nodes (6): compilerOptions, paths, strict, extends, include, @/*

### Community 35 - "Community 35"
Cohesion: 0.33
Nodes (5): OTPCell, OTPCellProps, OTPInput, OTPInputProps, styles

### Community 36 - "Community 36"
Cohesion: 0.33
Nodes (4): DayOption, DAYS, styles, TIME_SLOTS

### Community 37 - "Community 37"
Cohesion: 0.40
Nodes (4): countSelected(), DetailRow, parseJSON(), styles

### Community 38 - "Community 38"
Cohesion: 0.33
Nodes (4): PropertyCardVariant, Props, STATUS_BADGES, StatusOverlay

### Community 39 - "Community 39"
Cohesion: 0.33
Nodes (4): DayOption, DAYS, styles, TIME_SLOTS

### Community 40 - "Community 40"
Cohesion: 0.40
Nodes (3): Listing, MOCK_LISTINGS, styles

### Community 41 - "Community 41"
Cohesion: 0.40
Nodes (3): PropertyType, styles, TYPES

### Community 42 - "Community 42"
Cohesion: 0.40
Nodes (3): MediaItem, MediaType, styles

### Community 43 - "Community 43"
Cohesion: 0.50
Nodes (3): imports, @supabase/functions-js, @supabase/server

### Community 44 - "Community 44"
Cohesion: 0.50
Nodes (3): imports, @supabase/functions-js, @supabase/server

### Community 45 - "Community 45"
Cohesion: 0.50
Nodes (3): imports, @supabase/functions-js, @supabase/server

### Community 46 - "Community 46"
Cohesion: 0.50
Nodes (3): imports, @supabase/functions-js, @supabase/server

### Community 49 - "Community 49"
Cohesion: 0.67
Nodes (3): config, { getDefaultConfig }, { withNativeWind }

### Community 50 - "Community 50"
Cohesion: 0.50
Nodes (3): imports, @supabase/functions-js, @supabase/server

## Knowledge Gaps
- **521 isolated node(s):** `name`, `slug`, `version`, `scheme`, `favicon` (+516 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ScreenBody()` connect `Community 28` to `Community 1`, `Community 19`, `Community 21`, `Community 33`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **Why does `useClerkSupabase()` connect `Community 4` to `Community 0`, `Community 1`, `Community 3`, `Community 9`, `Community 10`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Why does `usePropertyStore` connect `Community 5` to `Community 28`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **What connects `name`, `slug`, `version` to the rest of the system?**
  _521 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05213089802130898 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.054354178842782 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.0425531914893617 - nodes in this community are weakly interconnected._