@foreach ($books as $book)
    <p>{{ $book->title }}</p>
    <!-- Otros detalles del libro -->
@endforeach

{{ $books->links() }}
