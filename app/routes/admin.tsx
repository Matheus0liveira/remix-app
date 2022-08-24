import type {
  ActionFunction,
  ErrorBoundaryComponent,
  LoaderFunction,
} from "@remix-run/node";
import type { CatchBoundaryComponent } from "@remix-run/react/dist/routeModules";

export const loader: LoaderFunction = ({ params }) => {
  return {};
};

export const action: ActionFunction = ({ params }) => {
  return {};
};

export default function () {
  return <div>Content is king!</div>;
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return <div>Whoops! - {error.message}</div>;
};

export const CatchBoundary: CatchBoundaryComponent = () => {
  return <h3>Not Found</h3>;
};
