import * as canvas from '../canvas';

describe('actions/canvas', () => {
  test('load canvas', () => {
    expect(
      canvas.loadCanvas({ id: 'http://example.org/canvas', type: 'Canvas' })
    ).toEqual({
      state: { id: 'http://example.org/canvas', type: 'Canvas' },
      type: 'LOAD_CANVAS',
    });
  });

  test('mediaLoading', () => {
    expect(canvas.mediaLoading(0, 10000, 50)).toEqual({
      payload: { duration: 50, percentLoaded: 0 },
      type: 'MEDIA_LOADING',
    });

    expect(canvas.mediaLoading(2500, 10000, 50)).toEqual({
      payload: { duration: 50, percentLoaded: 25 },
      type: 'MEDIA_LOADING',
    });
  });

  test('mediaLoading - failing', () => {
    expect(() => canvas.mediaLoading(11000, 10000, 50)).toThrowError(
      'Bytes loaded cannot be more than the total'
    );
  });

  test('mediaLoaded', () => {
    expect(canvas.mediaLoaded(true)).toEqual({
      payload: { isLoaded: true },
      type: 'MEDIA_LOADED',
    });

    expect(canvas.mediaLoaded(false)).toEqual({
      payload: { isLoaded: false },
      type: 'MEDIA_LOADED',
    });
  });

  test('mediaError', () => {
    expect(canvas.mediaError(100, 'Some error')).toEqual({
      payload: { code: 100, description: 'Some error' },
      type: 'MEDIA_ERROR',
    });
    expect(canvas.mediaError(101)).toEqual({
      payload: { code: 101, description: 'Unknown error' },
      type: 'MEDIA_ERROR',
    });

    expect(canvas.mediaError()).toEqual({
      payload: { code: undefined, description: 'Unknown error' },
      type: 'MEDIA_ERROR',
    });
  });
});
