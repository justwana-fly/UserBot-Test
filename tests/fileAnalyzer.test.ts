import { FileAnalyzer } from '../src/fileAnalyzer';

describe('FileAnalyzer', () => {
  let analyzer: FileAnalyzer;

  beforeEach(() => {
    analyzer = new FileAnalyzer();
  });

  test('should analyze a file and log correct stats', async () => {
    const inputPath = 'testFile.txt'; // Ensure this file exists with test content
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    await analyzer.analyzeFile(inputPath);

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Numero totale di parole'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Numero di lettere'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Numero di spazi'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Parole che si ripetono più di 10 volte'));
    
    consoleSpy.mockRestore();
  });
});
