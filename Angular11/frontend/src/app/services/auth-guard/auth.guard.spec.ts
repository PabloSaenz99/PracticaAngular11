import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { JwtHelperService, JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(async () => {
    function tokenGetter() {
      return localStorage.getItem("token");
    }
    const JWT_Module_Options: JwtModuleOptions = {
      config: {
          tokenGetter: tokenGetter
      }
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule,
        JwtModule.forRoot(JWT_Module_Options), ToastrModule.forRoot({
          timeOut: 2500,
          positionClass: 'toast-top-right',
          preventDuplicates: true,
        })],
      providers: [JwtHelperService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
