import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from './environments/environment.development';

const { authUrl, postsUrl } = environment;

export const appInterceptor: HttpInterceptorFn = (req, next) => {
    if(req.url.startsWith('/auth')) {
        req = req.clone({
            url: req.url.replace('/auth', authUrl)
        })
    }

    if(req.url.startsWith('/posts')) {
        req = req.clone({
            url: req.url.replace('/posts', postsUrl)
        })
    }
     
    return next(req);
};
