#ifndef BOOK_H 
#define BOOK_H 
 
 
class Book { 
private: 
    std::string title; 
    std::string author; 
    std::string isbn; 
    std::string deweyDecimal; 
    int year; 
 
public: 
    // Constructors 
    Book(); 
 
    // Getters 
    std::string getTitle() const; 
    std::string getAuthor() const; 
    std::string getISBN() const; 
    std::string getDeweyDecimal() const; 
    int getYear() const; 
 
    // Setters 
    void setYear(int newYear); 
 
    // Display 
    void printInfo() const; 
}; 
 
#endif // BOOK_H 
