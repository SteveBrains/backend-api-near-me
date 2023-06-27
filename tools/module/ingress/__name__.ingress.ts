import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('__name__(pascalCase)')
export class __name__(pascalCase)Ingress {
  @Process()
  async transcode(job: Job<unknown>) {
    try {
      console.log('job', job.data);
      job.moveToCompleted();
    } catch (error) {
      console.log('failed');
      job.moveToFailed({
        message: 'Failed to test',
      });
    }

    return {};
  }
}
