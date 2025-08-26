#include "Book.h" 
#include "Catalog.h" 
 
int main() { 
 
    // Create a catalog 
    Catalog libraryCatalog; 
 
    // Create some books 
    Book book1("The C++ Programming Language", "Bjarne Stroustrup", "978-0321563842", "005.133", 2013); 
    Book book2("Design Patterns", "Erich Gamma", "978-0201633610", "005.12", 1994); 
    Book book3("The Art of Computer Programming", "Donald Knuth", "978-0321751041", "005.1", 2011); 
    Book book4("The Mythical Man-Month", "Fred Brooks", "978-0201835953", "005.1", 1995); 
    Book book5("The Pragmatic Programmer", "Andrew Hunt", "978-0201616224", "005.1", 1999); 
    Book book6("The Soul of Black Folks", "W.E.B. Du Bois", "123-4567890123", "973.04", 1903); 
 
    // Add books to the catalog 
    libraryCatalog.addBook(book1); 
    libraryCatalog.addBook(book2); 
    libraryCatalog.addBook(book3); 
    libraryCatalog.addBook(book4); 
    libraryCatalog.addBook(book5); 
    libraryCatalog.addBook(book6); 
 
    // Test 1: List all books 
    libraryCatalog.listAllBooks(); 
 
    // Test 2: Search by Title 
    Book* foundBook = libraryCatalog.searchByTitle("Design Patterns"); 
    if (foundBook != nullptr) { 
        foundBook-
    } else { 
    } 
 
    // Test 3: Search by Author 
    for (Book* book : knuthBooks) { 
        book-
    } 
 
    // Test 4: Browse by Dewey Decimal (MAIN PROJECT FEATURE) 
    for (Book* book : softwareEngineeringBooks) { 
        book-
    } 
 
    // Test 5: Remove a book and list again 
    bool removed = libraryCatalog.removeBook("978-0201835953"); 
    if (removed) { 
    } else { 
    } 
 
    libraryCatalog.listAllBooks(); 
 
    return 0; 
} 
