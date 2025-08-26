#include "Book.h" 
 
// Default Constructor 
Book::Book() : title(""), author(""), isbn(""), deweyDecimal(""), year(0) {} 
 
// Parameterized Constructor 
    : title(title), author(author), isbn(isbn), deweyDecimal(deweyDecimal), year(year) {} 
 
// Getters 
std::string Book::getTitle() const { return title; } 
std::string Book::getAuthor() const { return author; } 
std::string Book::getISBN() const { return isbn; } 
std::string Book::getDeweyDecimal() const { return deweyDecimal; } 
int Book::getYear() const { return year; } 
 
// Setters 
void Book::setYear(int newYear) { year = newYear; } 
 
// Display Method 
void Book::printInfo() const { 
} 
