### Launch project

node - v20.11.0

-   `npm install` - Install project dependencies.
-   `npm run start:dev` - Start the project in the development environment using webpack.

### Architecture

Feature-Sliced Design (FSD)
Project follows the Feature-Sliced Design (FSD) architecture. Check out the FSD documentation for understanding key principles.

[Feature-Sliced Design](https://feature-sliced.design/)

### Optimization

To optimize the application performance and user experience, the project utilizes the following techniques:

-   Memoization (memo), callback memoization (useCallback), and memoized values (useMemo) are employed for optimizing component rendering and preventing unnecessary re-renders.
-   Code splitting is implemented to efficiently load and render components, improving initial page load times and overall performance.
-   When using Redux reducers, including async reducers, code splitting should also be followed to ensure efficient loading and management of state-related logic.

### Testing

Unit Testing (Jest): `npm run test:unit`

### Key modules to check

1.  `shared/Select` - low abstraction component to implement browser select with keyboard navigation and virtualization to handle large lists
2.  `entities/Name` - module which handle all `Name` entity things (in FSD entity handles ui/fetch(only GET)/mappers/hooks/ etc...) - in this app `Name` include only hook which fetches `Name` list (used in `features/NamesSelector`)
3.  `features/NamesSelector` - module which fetches names from api and list it by `shared/Select`
4.  `features/ThousandsItemsSelector` - module which draw thousands items in `Select`(`shared/Select`) to demonstrate virtualization - ability to draw large amounts of `option`
5.  `pages/Main` - just render `NamesSelector` and `ThousandsItemsSelector` on page
