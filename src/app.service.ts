import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}
  async getData() {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<any[]>('https://dummyjson.com/products/1').pipe(
          catchError((error: AxiosError) => {
            console.log(error);
            throw 'An error happened!';
          }),
        ),
      );
      console.log(data);
      return 'resData';
    } catch (err) {
      console.log(err);
    }
  }
}
