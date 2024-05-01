# Pixels - a Dribbble clone

Pixels - is a platform for designers from all over the world that helps them share their works.

## Key features

- Stunning design and animations.
- Authentication and Authorization using Next Auth
- All the CRUD opeations with a shot
- Advanced upload post from with an advanced text editor
- Forgot password functionality
- Emails
- Views
- Likes
- Favourites
- Comments
- Messages
- Ability to update your user profile

## Tech stack

1. NextJS
2. TalwindCSS for styling.
3. Git as a version control.
4. Next Auth V4
5. Next API routes
6. PostgreSQL
7. Prisma as a Type ORM
8. React hook for handling forms
9. Redux as a store
10. React Query to optimize my website and make user experience better using some techniques like: Infinite Scroll, caching, loading states
11. Resend + React Emails for beatiful emails
12. AWS S3 for storing images on the server.
13. Framer motion for animations.
14. And some third-party libraries like Zod, Tip Tap, axios, etc.

# How to run?

1. Copy repository using `git clone`.
2. Create `.env` file and fill all the .env variables. (To fill them in, you will have to register to AWS, Resend and create a db locally on your computer or use a hosted one.)
3. Run `npm run dev` to start a dev server or `npm run build && npm start` if you would like to start it as a bundled application.
4. Done. And, of course you can use other package managers like `yarn` or `pnpm`

Also, it worth mentioning that I regret not writing tests and not setting up CI/CD. I'll keep my mistakes in mind for the next project.

![Pixels image](https://i.imgur.com/zsZGmqe.jpeg)
