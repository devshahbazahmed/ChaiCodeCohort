/**
 * TODO: Handle 404 errors
 *
 * Return 404 with { error: { message: 'Route not found' } }
 */
export function notFound(req, res) {
  return res.status(400).json({
    error: { message: 'Route not found' },
  });
}
