# CS450
---

# Party Invitation App

## Overview

The Party Invitation App is a React Native application designed to facilitate the creation, management, and sending of party invitations. The app allows users to manage a list of friends, create and edit invitations, and send these invitations based on friends' hobbies. The data is stored locally in a JSON file (`db.json`) using `json-server` for a mock backend.

## Features

1. **Friend Management**:
   - Add new friends with details such as full name, hobbies, job position, gender, contact information, and address.
   - Edit existing friends' details.
   - Delete friends from the list.
   - View detailed information about each friend.

2. **Invitation Management**:
   - Create new party invitations with details like event name, date, time, location, and invited groups.
   - Edit existing invitations.
   - Delete invitations from the list.
   - View detailed information about each invitation.

3. **Sending Invitations**:
   - Send invitations to friends based on their hobbies.
   - Display a list of friends who have been invited to a specific party.
   - Update friends with the parties they have been invited to.

4. **User Interface**:
   - Responsive and user-friendly UI with attractive animations and visual effects.
   - Use of custom fonts and background images for a visually appealing design.

## Architecture

- **Front-End**: Built using React Native, leveraging components for a modular and maintainable codebase.
- **State Management**: Context API is used for managing state across the app, providing a centralized store for friends and invitations.
- **Backend**: `json-server` is used to simulate a RESTful API, serving and persisting data in `db.json`.

## Components

### Home Screen
- Displays a welcoming message with a visually appealing design.
- Loads custom fonts and handles splash screen.

### Friends
- **Friends List**: Displays all friends with their details.
- **Friend Form**: Used to add or edit friend details.
- **Friend Details**: Shows detailed information about a friend, including the parties they are invited to.

### Invitations
- **Invitations List**: Displays all invitations with their details.
- **Invitation Form**: Used to create or edit invitations.
- **Invitation Details**: Shows detailed information about an invitation and allows sending invitations to friends based on hobbies.

## Data Handling

- **CRUD Operations**: The app performs Create, Read, Update, and Delete operations on friends and invitations data stored in `db.json`.
- **API Services**: Axios is used to handle API requests to `json-server`.
- **Error Handling**: Basic error handling is implemented to manage API request failures and validation errors in forms.

## State Management

- **FriendsContext**: Manages the state of friends, including actions to set, create, update, and delete friends.
- **InvitationsContext**: Manages the state of invitations, including actions to set, create, update, and delete invitations.

## Technical Details

- **React Native**: For building the mobile application.
- **Expo**: For building, deploying, and managing the React Native project.
- **Context API**: For state management across the app.
- **Axios**: For making HTTP requests to the mock backend.
- **json-server**: For simulating a RESTful API with `db.json`.
- **Custom Fonts**: Loaded using `expo-font` for enhanced typography.
- **Animations**: Implemented using `react-native-reanimated` for smooth transitions and effects.

## Setup Instructions

1. **Clone the Repository**:
   ```sh
   git clone https://github.com/yourusername/party-invitation-app.git
   cd party-invitation-app
   ```

2. **Install Dependencies**:
   ```sh
   npm install
   ```

3. **Start the JSON Server**:
   ```sh
   npx json-server --watch db.json --port 3000
   ```

4. **Run the App**:
   ```sh
   npx expo start
   ```

## Future Enhancements

- **Authentication**: Add user authentication to manage invitations and friends securely.
- **Notifications**: Implement push notifications for sent invitations and event reminders.
- **Sharing**: Allow users to share invitations via social media or messaging apps.
- **Backend Integration**: Integrate with a real backend service for persistent data storage and more complex functionalities.

---
