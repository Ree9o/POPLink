import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

export class GqlAuthGuard extends AuthGuard('local') {
  constructor() {
    super();
  }
  getRequest(context: ExecutionContext) {
    const createGqlContext = GqlExecutionContext.create(context);
    const request = createGqlContext.getContext();
    request.body = createGqlContext.getArgs().signInInput;
    return request;
  }
}
