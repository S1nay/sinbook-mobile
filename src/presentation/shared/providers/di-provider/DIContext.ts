import { Container } from 'inversify';
import { createContext } from 'react';

const DIContext = createContext<Container | null>(null);

export default DIContext;
