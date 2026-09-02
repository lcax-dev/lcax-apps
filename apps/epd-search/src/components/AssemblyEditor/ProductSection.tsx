import {
  Grid,
  Group,
  NumberInput,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
  UnstyledButton,
} from '@mantine/core'
import { addImpactEpd } from './addImpactEpd'
import { applyFirstEpdDefaults } from './editorState'
import { EpdTypeahead } from './EpdTypeahead'
import { GwpBlock } from './GwpBlock'
import { liveProductGwp } from './liveGwp'
import { unitSelectOptions } from './units'
import type { EditorEpd, EditorProduct } from './types'

type ProductSectionProps = {
  index: number
  product: EditorProduct
  onChange: (product: EditorProduct) => void
  onRemove: () => void
}

export const ProductSection = ({ index, product, onChange, onRemove }: ProductSectionProps) => {
  const gwp = liveProductGwp(product)
  const heading = product.name.trim() || `Product ${index + 1}`

  const attachEpd = (epd: EditorEpd) => {
    const withDefaults = applyFirstEpdDefaults(product, epd)
    onChange({ ...withDefaults, impactData: addImpactEpd(withDefaults.impactData, epd) })
  }

  return (
    <Stack gap='md' py='md'>
      <Group justify='space-between' align='flex-end'>
        <Title order={3}>{heading || `Product ${index + 1}`}</Title>
        <UnstyledButton w='fit-content' style={{ textDecoration: 'underline' }} onClick={onRemove}>
          Remove product
        </UnstyledButton>
      </Group>
      <GwpBlock label='Product GWP' value={gwp} />
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing='md'>
        <Grid gap='md'>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <TextInput
              label='Name'
              radius='xl'
              value={product.name}
              onChange={(event) => onChange({ ...product, name: event.currentTarget.value })}
            />

            <NumberInput
              label='Reference service life'
              radius='xl'
              min={0}
              value={product.referenceServiceLife ?? ''}
              onChange={(value) =>
                onChange({ ...product, referenceServiceLife: typeof value === 'number' ? value : null })
              }
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <NumberInput
              label='Quantity'
              radius='xl'
              min={0}
              value={product.quantity}
              onChange={(value) => onChange({ ...product, quantity: typeof value === 'number' ? value : 0 })}
            />
            <Select
              label='Unit'
              radius='xl'
              comboboxProps={{ radius: 0 }}
              data={unitSelectOptions}
              searchable
              clearable
              value={product.unit || null}
              onChange={(value) => onChange({ ...product, unit: value ?? '' })}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12 }}>
            <Textarea
              label='Description'
              radius='xl'
              autosize
              minRows={2}
              value={product.description}
              onChange={(event) => onChange({ ...product, description: event.currentTarget.value })}
            />
          </Grid.Col>
        </Grid>

        <Stack gap='sm'>
          <Text fw='bold'>EPDs</Text>
          {product.impactData.length === 0 ? (
            <Text c='dimmed' size='sm'>
              No EPDs attached.
            </Text>
          ) : (
            product.impactData.map((item) => (
              <Group key={`${item.id}::${item.version}`} justify='space-between' align='center' wrap='nowrap'>
                {item.epd ? (
                  <Text>
                    {item.epd.name} ({item.version})
                  </Text>
                ) : (
                  <Text c='red'>
                    Missing EPD {item.id} ({item.version})
                  </Text>
                )}
                <UnstyledButton
                  w='fit-content'
                  style={{ textDecoration: 'underline' }}
                  onClick={() =>
                    onChange({
                      ...product,
                      impactData: product.impactData.filter(
                        (ref) => !(ref.id === item.id && ref.version === item.version),
                      ),
                    })
                  }
                >
                  Remove
                </UnstyledButton>
              </Group>
            ))
          )}
          <EpdTypeahead attached={product.impactData} onSelect={attachEpd} />
        </Stack>
      </SimpleGrid>
    </Stack>
  )
}
