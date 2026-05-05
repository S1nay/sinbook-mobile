# Graph Report - src  (2026-05-05)

## Corpus Check
- Corpus is ~25,668 words - fits in a single context window. You may not need a graph.

## Summary
- 669 nodes · 315 edges · 362 communities (291 shown, 71 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 9 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_App Core & DI Providers|App Core & DI Providers]]
- [[_COMMUNITY_Profile Details Screen|Profile Details Screen]]
- [[_COMMUNITY_User Repository|User Repository]]
- [[_COMMUNITY_Axios HTTP Client|Axios HTTP Client]]
- [[_COMMUNITY_WebSocket Client|WebSocket Client]]
- [[_COMMUNITY_MMKV Storage|MMKV Storage]]
- [[_COMMUNITY_Post Repository|Post Repository]]
- [[_COMMUNITY_Navigation Service|Navigation Service]]
- [[_COMMUNITY_Login Screen|Login Screen]]
- [[_COMMUNITY_Register Screen|Register Screen]]
- [[_COMMUNITY_Comment API|Comment API]]
- [[_COMMUNITY_Post API|Post API]]
- [[_COMMUNITY_User API|User API]]
- [[_COMMUNITY_Auth Repository|Auth Repository]]
- [[_COMMUNITY_Comment Repository|Comment Repository]]
- [[_COMMUNITY_Auth Token Storage|Auth Token Storage]]
- [[_COMMUNITY_Create Post Screen|Create Post Screen]]
- [[_COMMUNITY_Profile Edit Screen|Profile Edit Screen]]
- [[_COMMUNITY_Profile Posts Screen|Profile Posts Screen]]
- [[_COMMUNITY_Get User Posts Use Case|Get User Posts Use Case]]
- [[_COMMUNITY_File Upload API|File Upload API]]
- [[_COMMUNITY_File Repository|File Repository]]
- [[_COMMUNITY_User Data Storage|User Data Storage]]
- [[_COMMUNITY_Socket Manager|Socket Manager]]
- [[_COMMUNITY_Auth API|Auth API]]
- [[_COMMUNITY_Follows API|Follows API]]
- [[_COMMUNITY_Follows Repository|Follows Repository]]
- [[_COMMUNITY_Post Store|Post Store]]
- [[_COMMUNITY_User Store|User Store]]
- [[_COMMUNITY_Navigation Layouts|Navigation Layouts]]
- [[_COMMUNITY_Like API|Like API]]
- [[_COMMUNITY_Like Repository|Like Repository]]
- [[_COMMUNITY_Login Use Case|Login Use Case]]
- [[_COMMUNITY_Logout Use Case|Logout Use Case]]
- [[_COMMUNITY_Register Use Case|Register Use Case]]
- [[_COMMUNITY_Post Avatar Use Case|Post Avatar Use Case]]
- [[_COMMUNITY_Create Post Use Case|Create Post Use Case]]
- [[_COMMUNITY_Get User Use Case|Get User Use Case]]
- [[_COMMUNITY_Patch User Use Case|Patch User Use Case]]
- [[_COMMUNITY_Theme System|Theme System]]
- [[_COMMUNITY_Bottom Sheet Modal|Bottom Sheet Modal]]
- [[_COMMUNITY_Use Case Registry|Use Case Registry]]
- [[_COMMUNITY_Create Post Validation|Create Post Validation]]
- [[_COMMUNITY_Edit Profile Validation|Edit Profile Validation]]
- [[_COMMUNITY_Login Validation|Login Validation]]
- [[_COMMUNITY_Register Validation|Register Validation]]
- [[_COMMUNITY_Add Icon (PlusCreate)|Add Icon (Plus/Create)]]
- [[_COMMUNITY_Bell Icon (Notifications)|Bell Icon (Notifications)]]
- [[_COMMUNITY_Camera Icon (Photo Capture)|Camera Icon (Photo Capture)]]
- [[_COMMUNITY_Chat Icon (Messaging)|Chat Icon (Messaging)]]
- [[_COMMUNITY_Check Icon (ConfirmationSelection)|Check Icon (Confirmation/Selection)]]
- [[_COMMUNITY_Check Circle Icon (SuccessDone)|Check Circle Icon (Success/Done)]]
- [[_COMMUNITY_Close Eye Icon (Hide Password)|Close Eye Icon (Hide Password)]]
- [[_COMMUNITY_Comment Icon (Post Comments)|Comment Icon (Post Comments)]]
- [[_COMMUNITY_Eye Icon (Show PasswordView)|Eye Icon (Show Password/View)]]
- [[_COMMUNITY_Home Icon (Home Tab Navigation)|Home Icon (Home Tab Navigation)]]
- [[_COMMUNITY_Image Icon (PhotoMedia)|Image Icon (Photo/Media)]]
- [[_COMMUNITY_Image Library Icon (Add Photo from Gallery)|Image Library Icon (Add Photo from Gallery)]]
- [[_COMMUNITY_Left Arrow Icon (Back Navigation)|Left Arrow Icon (Back Navigation)]]
- [[_COMMUNITY_LikeHeart Icon (Social Like)|Like/Heart Icon (Social Like)]]
- [[_COMMUNITY_Lock Icon (PasswordSecurity)|Lock Icon (Password/Security)]]
- [[_COMMUNITY_App Logo (Sinbook Brand Identity)|App Logo (Sinbook Brand Identity)]]
- [[_COMMUNITY_Logout Icon (ExitSign Out)|Logout Icon (Exit/Sign Out)]]
- [[_COMMUNITY_Mail Icon (Email Input)|Mail Icon (Email Input)]]
- [[_COMMUNITY_Message Arrow Icon (Send Message)|Message Arrow Icon (Send Message)]]
- [[_COMMUNITY_Pencil Icon (EditWrite)|Pencil Icon (Edit/Write)]]
- [[_COMMUNITY_Search Icon (SearchDiscover)|Search Icon (Search/Discover)]]
- [[_COMMUNITY_Smile Icon (EmojiReactions)|Smile Icon (Emoji/Reactions)]]
- [[_COMMUNITY_Three Dots Icon (More OptionsContext Menu)|Three Dots Icon (More Options/Context Menu)]]
- [[_COMMUNITY_Trash Icon (Delete)|Trash Icon (Delete)]]
- [[_COMMUNITY_User Icon (Profile Tab)|User Icon (Profile Tab)]]
- [[_COMMUNITY_Warning Icon (ErrorAlert)|Warning Icon (Error/Alert)]]
- [[_COMMUNITY_Avatar Placeholder Image|Avatar Placeholder Image]]

## God Nodes (most connected - your core abstractions)
1. `UserRepository` - 12 edges
2. `AxiosHttpClient` - 10 edges
3. `WebSocketIOClient` - 10 edges
4. `MMKVStorage` - 10 edges
5. `ProfileDetailsViewModel` - 9 edges
6. `PostRepository` - 8 edges
7. `NavigationService` - 7 edges
8. `LoginViewModel` - 7 edges
9. `RegisterViewModel` - 7 edges
10. `CommentApi` - 6 edges

## Surprising Connections (you probably didn't know these)
- `ViewModelInjector()` --calls--> `bindInContainer()`  [INFERRED]
  presentation/components/view-model-injector/ViewModelInjector.tsx → core/helpers/bind-in-container/bindInContainer.ts
- `AppNavigator()` --calls--> `useAuth()`  [INFERRED]
  navigation/AppNavigator.tsx → core/hooks/use-auth/useAuth.ts
- `AppNavigator()` --calls--> `useDIContainer()`  [INFERRED]
  navigation/AppNavigator.tsx → core/hooks/use-DI-container/useDIContainer.ts
- `ViewModelInjector()` --calls--> `useDIContainer()`  [INFERRED]
  presentation/components/view-model-injector/ViewModelInjector.tsx → core/hooks/use-DI-container/useDIContainer.ts
- `ProfilePostsView()` --calls--> `useDIContainer()`  [INFERRED]
  presentation/screens/profile-posts-screen/view/ProfilePostsView.tsx → core/hooks/use-DI-container/useDIContainer.ts

## Communities (362 total, 71 thin omitted)

### Community 0 - "App Core & DI Providers"
Cohesion: 0.11
Nodes (8): AuthProvider(), bindInContainer(), AppNavigator(), useAuth(), useDIContainer(), usePagination(), ViewModelInjector(), ProfilePostsView()

### Community 41 - "Bottom Sheet Modal"
Cohesion: 0.83
Nodes (3): getBottomSheetModal(), hide(), show()

## Knowledge Gaps
- **27 isolated node(s):** `Add Icon (Plus/Create)`, `Bell Icon (Notifications)`, `Camera Icon (Photo Capture)`, `Chat Icon (Messaging)`, `Check Icon (Confirmation/Selection)` (+22 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **71 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What connects `Add Icon (Plus/Create)`, `Bell Icon (Notifications)`, `Camera Icon (Photo Capture)` to the rest of the system?**
  _27 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App Core & DI Providers` be split into smaller, more focused modules?**
  _Cohesion score 0.11 - nodes in this community are weakly interconnected._
- **Should `Profile Details Screen` be split into smaller, more focused modules?**
  _Cohesion score 0.13 - nodes in this community are weakly interconnected._