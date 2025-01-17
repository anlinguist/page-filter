import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response, Request } from 'express';

@Catch()
export class PayloadTooLargeFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception.type === 'entity.too.large') {
      const payloadSize = request.headers['content-length'] || 'unknown';
      const limit = exception.limit || 'unknown';

      console.error(`Payload too large. Size: ${payloadSize}, Limit: ${limit}`);

      return response.status(HttpStatus.PAYLOAD_TOO_LARGE).json({
        message: 'Payload too large',
        size: payloadSize,
        limit: limit,
      });
    }

    // Pass other exceptions to default handler
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    response.status(status).json({
      message: exception.message || 'Internal server error',
    });
  }
}