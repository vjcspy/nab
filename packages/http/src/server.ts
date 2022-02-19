import App from '@/app';
import validateEnv from '@utils/validateEnv';

import { authResolver } from '@resolvers/auth.resolver';
import { userResolver } from '@resolvers/users.resolver';
import { ProductResolver } from '@resolvers/product.resolver';

validateEnv();

const app = new App([authResolver, userResolver, ProductResolver]);

app.listen();
