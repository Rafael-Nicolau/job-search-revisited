import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';

import TextInput from '@/components/shared/TextInput.vue';

describe('TextInput', () => {
  it('should communicate that user has entered character', async () => {
    const { emitted } = render(TextInput, {
      props: {
        modelValue: '',
      },
    });
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'Test');
    const messages = emitted()['update:modelValue'];
    expect(messages).toEqual([['T'], ['Te'], ['Tes'], ['Test']]);
  });
});
