import { ReflectiveInjector } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';
import {
  BaseRequestOptions,
  ConnectionBackend,
  Http,
  RequestOptions,
  Response,
  ResponseOptions,
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { PinImage } from '../helpers/pin-image';
import { ImageService } from './image.service';

const mockImages: PinImage[] = [
  {
    _id: 'abc',
    description: '1',
    url: 'url',
    likers: [],
    date: (new Date()).toISOString(),
    owner: {
      name: 'abc',
      _id: 'someid',
      twitterID: 'twitter',
      picture: 'http://pic',
    },
  },
];

describe('ImageService', () => {
  let injector: ReflectiveInjector;
  let backend: MockBackend;
  let lastConn: any;
  let imageService: ImageService;

  beforeEach(() => {
    injector = ReflectiveInjector.resolveAndCreate([
      { provide: RequestOptions, useClass: BaseRequestOptions },
      { provide: ConnectionBackend, useClass: MockBackend },
      Http,
      ImageService,
    ]);
    backend = injector.get(ConnectionBackend) as MockBackend;
    backend.connections.subscribe((conn: any) => lastConn = conn);
    imageService = injector.get(ImageService);
  });

  it('should list images', fakeAsync(() => {
    let images;
    imageService.list(42, 9).subscribe((res) => images = res);
    expect(lastConn.request.url).toMatch(/image/);
    expect(lastConn.request.url).toMatch(/skip=42/);
    expect(lastConn.request.url).toMatch(/limit=9/);

    lastConn.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify({ images: mockImages }),
    })));
    tick();

    expect(images).toEqual(mockImages);
  }));

  it('should list own images', fakeAsync(() => {
    let images;
    imageService.getOwn().subscribe((res) => images = res);
    expect(lastConn.request.url).toMatch(/image\/me/);

    lastConn.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify({ images: mockImages }),
    })));
    tick();

    expect(images).toEqual(mockImages);
  }));

  it('should post new image', fakeAsync(() => {
    const url = 'https://some/url';
    const description = 'some des';
    const body = { url, description };

    let image;
    imageService.upload(url, description).subscribe((res) => image = res);
    expect(lastConn.request.url).toMatch(/image/);
    expect(JSON.parse(lastConn.request.getBody())).toEqual(body);

    lastConn.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify({ image: mockImages[0] }),
    })));
    tick();
    expect(image).toEqual(mockImages[0]);
  }));

  it('should like image', fakeAsync(() => {
    const imageID = 'someid';

    let image;
    imageService.like(imageID).subscribe((res) => image = res);
    expect(lastConn.request.url).toMatch(/image/);
    expect(JSON.parse(lastConn.request.getBody())).toEqual({ imageID });

    lastConn.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify({ image: mockImages[0] }),
    })));
    tick();
    expect(image).toEqual(mockImages[0]);
  }));

  it('should delete image', fakeAsync(() => {
    const imageID = 'someid';

    let image;
    imageService.delete(imageID).subscribe((res) => image = res);
    expect(lastConn.request.url).toMatch(/image/);
    expect(JSON.parse(lastConn.request.getBody())).toEqual({ imageID });

    lastConn.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify({ image: mockImages[0] }),
    })));
    tick();
    expect(image).toEqual(mockImages[0]);
  }));
});
