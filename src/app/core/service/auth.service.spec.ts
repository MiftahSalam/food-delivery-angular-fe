import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { UserRegDTO } from '../model/dto/user-reg-dto';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../model/response/base-response';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be register user', () => {

    const userRegDTO: UserRegDTO = {
      email: "salam.miftah",
      lastName: "salam",
      name: "miftah",
      password: "123456",
    }
    const userResponse: BaseResponse<string> = {
      data: "user created",
      message: "success",
      status: "ok"
    }
    service.register(userRegDTO).subscribe({
      next: (data) => {
        console.log(data);
        expect(data).toEqual("user created")
      },
      error: (err) => {
        console.log(err);

      }
    })

    const url = environment.baseUrl
    const req = httpMock.expectOne(url + "/auth/register")

    expect(req.request.method).toEqual("POST")

    httpMock.verify()
  });

});
